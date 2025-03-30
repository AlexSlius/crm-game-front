import { Link, useLocation } from "react-router-dom";

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

    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={[
                {
                    key: CONSTANTS.home,
                    icon: <DashboardOutlined />,
                    label: <Link to={CONSTANTS.home}>Панель</Link>,
                },
                {
                    key: CONSTANTS.games,
                    icon: <DiscordOutlined />,
                    label: <Link to={CONSTANTS.games}>Ігри</Link>,
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