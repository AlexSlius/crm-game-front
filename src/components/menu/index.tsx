import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { Menu } from 'antd';
import {
    DiscordOutlined,
    DashboardOutlined,
    TeamOutlined,
    // QuestionCircleOutlined,
    UserSwitchOutlined,
    HomeOutlined
} from '@ant-design/icons';

import CONSTANTS from "../../constants/routers.json";

export const MenuMain = () => {
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    useEffect(() => {
        if ([CONSTANTS.gamesActive, CONSTANTS.gamesAll].includes(location.pathname)) {
            setOpenKeys([CONSTANTS.games]);
        }
    }, [location.pathname]);

    return (
        <Menu
            theme="dark"
            mode="inline"
            openKeys={openKeys}
            selectedKeys={[location.pathname]}
            onOpenChange={setOpenKeys}
            items={[
                {
                    key: CONSTANTS.home,
                    icon: <DashboardOutlined />,
                    label: <Link to={CONSTANTS.home}>Панель</Link>,
                },
                {
                    key: CONSTANTS.games,
                    icon: <DiscordOutlined />,
                    label: 'Ігри',
                    children: [
                        {
                            key: CONSTANTS.gamesActive,
                            icon: <DiscordOutlined />,
                            label: <Link to={CONSTANTS.gamesActive}>Активні</Link>,
                        },
                        {
                            key: CONSTANTS.gamesAll,
                            icon: <DiscordOutlined />,
                            label: <Link to={CONSTANTS.gamesAll}>Всі</Link>,
                        },
                    ],
                },
                {
                    key: CONSTANTS.teams,
                    icon: <TeamOutlined />,
                    label: <Link to={CONSTANTS.teams}>Команди</Link>,
                },
                {
                    key: CONSTANTS.cities,
                    icon: <HomeOutlined />,
                    label: <Link to={CONSTANTS.cities}>Міста</Link>,
                },
                // {
                //     key: CONSTANTS.question,
                //     icon: <QuestionCircleOutlined />,
                //     label: <Link to={CONSTANTS.question}>Питання</Link>,
                // },
                {
                    key: CONSTANTS.users,
                    icon: <UserSwitchOutlined />,
                    label: <Link to={CONSTANTS.users}>Користувачі</Link>,
                },
            ]}
        />
    )
}