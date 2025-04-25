import { Spin } from 'antd';
import { Outlet } from "react-router-dom";

import { useInitAppData } from "../../hooks/useInitAppData";

export const ProtectedRoute = () => {
    const { globalFetching } = useInitAppData();

    if (globalFetching) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Spin size="large" />
            </div>
        );
    }

    return <Outlet />;
}
