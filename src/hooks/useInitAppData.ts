import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    user,
    role,
    status
} from '../api';

import CONSTANTS from "../constants/routers.json";

import { useAppData } from "../store/appData";


export const useInitAppData = (): { globalFetching: boolean } => {
    const [globalFetching, setGlobalFetching] = useState<boolean>(true);
    const setData = useAppData((state) => state.setData);
    const navigate = useNavigate();

    const {
        refetch,
    } = useQuery<any, Error>({
        queryKey: ['users'],
        queryFn: () => user.getUserCurrent(),
        enabled: false,
    });

    const {
        refetch: refetchInit,
    } = useQuery({
        queryKey: ['initAppData'],
        queryFn: async () => {
            const [roles, statuses] = await Promise.all([
                role.getRoles(),
                status.getStatuses()
            ]);

            return { roles, statuses };
        },

        enabled: false,
    });

    useEffect(() => {
        refetch().then((res) => {

            if (res.data?.statusCode === 401) {
                setGlobalFetching(false);
                localStorage.removeItem('token');

                return navigate(CONSTANTS.auth);
            }

            if (res.isSuccess) {
                setData({ user: res.data.data });

                refetchInit().then((res) => {
                    if (res.isSuccess) {
                        setData({
                            roles: res.data.roles,
                            statuses: res.data.statuses
                        });

                        setGlobalFetching(false);
                    }
                });
            }
        });
    }, []);

    return {
        globalFetching
    };
};
