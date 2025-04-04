import { Fragment, useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';
import { Button, Layout, theme, Flex, Drawer, Grid } from 'antd';
import { useLocation } from 'react-router-dom'

import { MenuMain } from '../components/menu';
import { UserMenu } from '../components/user-menu';
import { ConfirmationlogoutModal } from '../components/modals/confirmation-logout';

import { useModalLogoutStore } from '../store/modal-logout';
import { ChangePasswordModal } from '../components/modals/change-password';
import { useModalChangePasswordStore } from '../store/moda-change-password';

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

export const MainLayout = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { closeModal, isOpenModal } = useModalLogoutStore();
    const { isOpenModalChange, closeModalChange } = useModalChangePasswordStore();

    const location = useLocation()
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    let siderWidth = 300;

    if (screens.lg && !screens.xl) {
        siderWidth = 250;
    } else if (!screens.lg) {
        siderWidth = 200;
    }

    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        if (isMobile)
            setCollapsed(false)
    }, [location.pathname])

    return (
        <Fragment>
            <Layout className="c-l-h-100vh">
                {
                    !isMobile && (
                        <Sider
                            trigger={null}
                            collapsible
                            collapsed={collapsed}
                            width={siderWidth}
                            theme="dark"
                        >
                            <MenuMain />
                        </Sider>
                    )
                }

                {
                    isMobile && (
                        <Drawer
                            placement="left"
                            closable={true}
                            onClose={() => setCollapsed(false)}
                            open={collapsed}
                            width={250}
                        >
                            <MenuMain />
                        </Drawer>
                    )
                }

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