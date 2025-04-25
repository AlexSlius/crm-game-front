import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppData } from "../store/appData";

export const RequireModerator = ({ children }: { children: any }) => {
    const { user } = useAppData();

    if (!user?.role?.id) return <Navigate to="/not-found" replace />;

    return children;
};
