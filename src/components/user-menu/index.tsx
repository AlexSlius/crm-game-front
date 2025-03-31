import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Avatar, Typography, Flex, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

import { useModalLogoutStore } from '../../store/modal-logout';
import { useModalChangePasswordStore } from '../../store/moda-change-password';

const { Text } = Typography;


export const UserMenu = () => {
    const { openModal } = useModalLogoutStore();
    const { openModalChange } = useModalChangePasswordStore();

    const items: MenuProps['items'] = [
        {
            label: (
                <Button
                    size="small"
                    color="default"
                    variant="link"
                    block
                    onClick={openModalChange}
                >Змінити пароль</Button>
            ),
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <Button
                    size="small"
                    color="default"
                    variant="link"
                    block
                    onClick={openModal}
                >Вийти</Button>
            ),
            key: '1',
        },
    ];

    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <a href="/" onClick={(e) => e.preventDefault()}>
                <Space>
                    <Avatar icon={<UserOutlined />} />
                    <Flex vertical>
                        <Text strong>Олександр</Text>
                        <Text type="success" title="Івано-Франківськ, Львів">Івано-Франківськ, Львів</Text>
                    </Flex>
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    )
}