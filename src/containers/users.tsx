import { Flex, Typography, Button, Table, Tag, Space } from 'antd';
import { Fragment } from 'react/jsx-runtime';
import { useCallback, useMemo, useState } from 'react';
import { EditOutlined } from "@ant-design/icons";
import { UserEditModal } from '../components/modals/user.edit';

const { Title } = Typography;

const data = [
    { key: "1", id: 1, name: "Олександр", email: "test@gmail.com", city: { id: 1, name: '-' }, role: { id: 1, name: "Модератор" }, active: false },
    { key: "2", id: 2, name: "Марина", email: "test@gmail.com", city: { id: 2, name: 'Львів' }, role: { id: 2, name: "Модератор" }, active: true },
    { key: "3", id: 3, name: "Іван", email: "test@gmail.com", city: { id: 3, name: '-' }, role: { id: 3, name: "Модератор" }, active: true },
    { key: "4", id: 4, name: "Анна", email: "test@gmail.com", city: { id: 4, name: 'Львів' }, role: { id: 4, name: "Модератор" }, active: true },
];

const defaultDataModal = {
    show: false,
    data: {
        id: null,
        name: '',
        email: '',
        city: null,
        role: null,
        active: true,
        password: null,
    }
};

export const UsersContainer = () => {
    const [dataModal, setDataModal] = useState(defaultDataModal);

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const handleEdit = useCallback((record: any) => {
        setDataModal({
            show: true,
            data: {
                id: record.id,
                name: record.name,
                email: record.email,
                city: record.city.id,
                role: record.role.id,
                active: record.active,
                password: null,
            }
        });
    }, []);

    const hCloseModal = () => {
        setDataModal(defaultDataModal)
    }

    const columns = useMemo(() => [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Ім'я",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Пошта/логін",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Місто",
            dataIndex: "city",
            key: "city",
            render: (city: { id: number, name: string } | null) => city?.name || "-",
        },
        {
            title: "Роль",
            dataIndex: "role",
            key: "role",
            render: (role: { id: number, name: string } | null) => role?.name || "-",
        },
        {
            title: "Статус",
            dataIndex: "active",
            key: "status",
            render: (active: boolean) =>
                active ? <Tag color="green">Активний</Tag> : <Tag color="red">Неактивний</Tag>,
        },
        {
            title: "Дії",
            key: "actions",
            render: (_: any, record: any) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size='small'
                        onClick={() => handleEdit(record)}
                    />
                </Space>
            ),
        },
    ], [handleEdit]);

    return (
        <Fragment>
            <Flex justify='space-between' gap={14}>
                <Title level={4} className='c-norm-title'>Користувачі</Title>
                <Button size='small'  className='mob-btn-stan-none' type="primary" onClick={() => setDataModal((prev) => ({...prev, show: true}))}>+<span className='mob-btn-stan-none_span'>Додати</span></Button>
            </Flex>
            <Table
                className='c-table-mt-40'
                columns={columns}
                dataSource={data}
                pagination={pagination}
                size='small'
                loading={loading}
                scroll={{ x: 1000 }}
                style={{ maxWidth: 1000 }}
                onRow={(record) => ({
                    onClick: () => handleEdit(record),
                    style: { cursor: "pointer" }
                })}
            />

            <UserEditModal
                isModalOpen={dataModal.show}
                hCloseModal={hCloseModal}
                data={dataModal.data}
                setDataModal={setDataModal}
            />
        </Fragment>
    )
}