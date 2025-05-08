import { Fragment, useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';
import { Button, Layout, theme, Flex, Drawer, Grid } from 'antd';
import { useLocation } from 'react-router-dom'

import { MenuMain } from '../components/menu';
import { UserMenu } from '../components/user-menu';
import { ConfirmationlogoutModal } from '../components/modals/confirmation-logout';

import { useModalLogoutStore } from '../store/modal-logout';
import { ChangePasswordModal } from '../components/modals/change-password';
import { useModalChangePasswordStore } from '../store/moda-change-password';
import { useAppData } from '../store/appData';
import { questions } from '../api';
import { useNumberOfQuestionStore } from '../store/number-of-question';

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

export const MainLayout = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { closeModal, isOpenModal } = useModalLogoutStore();
    const { isOpenModalChange, closeModalChange } = useModalChangePasswordStore();
    const { user } = useAppData();
    const {quntity, record} = useNumberOfQuestionStore();

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

    const {
        data: dataQuestion,
    } = useQuery<any, Error>({
        queryKey: ['questionTotal'],
        queryFn: () => questions.tatalActive(),
    });

    useEffect(() => {
        record(dataQuestion?.data?.questioLength || 0);
    }, [dataQuestion]);

    useEffect(() => {
        if (isMobile)
            setCollapsed(false)
    }, [location.pathname, isMobile]);

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
                            <MenuMain
                                dataUser={user}
                                quantityQuestion={quntity}
                            />
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
                            <MenuMain
                                dataUser={user}
                                quantityQuestion={quntity}
                            />
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
                                <UserMenu dataUser={user} />
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