import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";

import { Menu } from 'antd';
import {
    DiscordOutlined,
    DashboardOutlined,
    TeamOutlined,
    QuestionCircleOutlined,
    UserSwitchOutlined,
    HomeOutlined
} from '@ant-design/icons';

import CONSTANTS from "../../constants/routers.json";

export const MenuMain = ({
    dataUser,
    quantityQuestion=0
}: {
    dataUser: any;
    quantityQuestion:number;
}) => {
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const location = useLocation();

    let menuItems: any = [];

    useEffect(() => {
        if ([CONSTANTS.gamesActive, CONSTANTS.gamesAll].includes(location.pathname)) {
            setOpenKeys([CONSTANTS.games]);
        }
    }, [location.pathname]);

    switch (dataUser?.role?.id) {
        case 1:
            menuItems = [
                {
                    key: CONSTANTS.cities,
                    icon: <HomeOutlined />,
                    label: <Link to={CONSTANTS.cities}>Міста</Link>,
                },
                {
                    key: CONSTANTS.users,
                    icon: <UserSwitchOutlined />,
                    label: <Link to={CONSTANTS.users}>Користувачі</Link>,
                },
            ];
            break;

        case 2:
            menuItems = [];
            break;
    }

    return (
        <Fragment>
            <div className="top-role-name">
                <p>{dataUser?.role?.name}</p>
            </div>
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
                    ...menuItems,
                    {
                        key: CONSTANTS.question,
                        icon: <QuestionCircleOutlined />,
                        label: <Link to={CONSTANTS.question}>Питання <span>{quantityQuestion}</span></Link>,
                    },
                ].filter(Boolean)}
            />
        </Fragment>
    )
}