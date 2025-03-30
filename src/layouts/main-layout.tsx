import { Fragment, useState } from 'react';
import { Outlet } from "react-router-dom";

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, theme, Flex } from 'antd';

import { MenuMain } from '../components/menu';
import { UserMenu } from '../components/user-menu';
import { ConfirmationlogoutModal } from '../components/modals/confirmation-logout';

import { useModalLogoutStore } from '../store/modal-logout';
import { ChangePasswordModal } from '../components/modals/change-password';
import { useModalChangePasswordStore } from '../store/moda-change-password';

const { Header, Sider, Content } = Layout;

export const MainLayout = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { closeModal, isOpenModal } = useModalLogoutStore();
    const {isOpenModalChange, closeModalChange} = useModalChangePasswordStore();

    const {
        token: {borderRadiusLG },
    } = theme.useToken();

    return (
        <Fragment>
            <Layout className="c-l-h-100vh">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width="300"
                    theme="dark"
                >
                    <MenuMain />
                </Sider>

                <Layout>
                    <Header
                        className="c-lay-header"
                    >
                        <Flex align="center" justify='space-between' gap={20}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                            <Flex align="center" gap={20}>
                                <UserMenu />
                            </Flex>
                        </Flex>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 0,
                            minHeight: 280,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>

            <ConfirmationlogoutModal
                desc='Вийти ?'
                isModalOpen={isOpenModal}
                hCloseModal={closeModal}
            />

            <ChangePasswordModal
                isModalOpen={isOpenModalChange}
                hCloseModal={closeModalChange}
            />
        </Fragment>
    )
}