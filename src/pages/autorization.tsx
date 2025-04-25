import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AutorizationContainer } from "../containers/authorization"
import { useAppData } from "../store/appData"

import CONSTANTS from "../constants/routers.json";

export const Autorization = () => {
    const { user } = useAppData();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.id || !!localStorage.getItem('token')) {
            navigate(CONSTANTS.home, { replace: true });
        }
    }, [user, navigate]);

    return (
        <AutorizationContainer />
    )
}