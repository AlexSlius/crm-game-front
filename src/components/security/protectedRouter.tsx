import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuthStore();

    // return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;

    return  <Outlet />;
}
