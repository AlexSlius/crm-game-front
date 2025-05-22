import { Flex, Typography, Button, Table, Tag, Space } from 'antd';
import { Fragment } from 'react/jsx-runtime';
import { useMutation } from '@tanstack/react-query';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EditOutlined } from "@ant-design/icons";
import { UserEditModal } from '../components/modals/user.edit';

import {
    user,
} from '../api';
import { useNoteStore } from '../store/note';

const { Title } = Typography;

const defaultDataModal = {
    show: false,
    data: {
        id: null,
        name: '',
        email: '',
        cityId: [],
        roleId: 2,
        statusId: 1,
        password: null,
    }
};

export const UsersContainer = () => {
    const [dataModal, setDataModal] = useState(defaultDataModal);
    const [dataUser, setDataUsers] = useState<any>(null);

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        total: 0,
    });

    const { setMessage } = useNoteStore();

    const {
        isLoading,
        refetch,
        data,
    } = useQuery<any, Error>({
        queryKey: ['users', pagination.current, pagination.pageSize],
        queryFn: () => user.getUsers({ page: pagination.current, limit: pagination.pageSize }),
    });

    const {
        mutate: mutateCreate,
        isPending: isLoadingCreate
    } = useMutation({
        mutationFn: user.create,
        onSuccess: (data) => {
            if (data?.message) {
                return setMessage(data?.message.join(", "));
            }

            refetch();
            hCloseModal();
            setMessage('Користувача успішно додано', 'success');
        },
    });

    const {
        mutate: mutateUpdate,
        isPending: isLoadingUpdate
    } = useMutation({
        mutationFn: user.update,
        onSuccess: (data) => {
            if (data?.message) {
                return setMessage(data?.message.join(", "));
            }

            refetch();
            hCloseModal();
            setMessage('Користувача успішно оновленно', 'success');
        },
    });

    const handleEdit = useCallback((record: any) => {
        setDataModal({
            show: true,
            data: {
                id: record.id,
                name: record.name,
                email: record.email,
                cityId: record.city.map((el: { id: number }) => el.id),
                roleId: record.role.id,
                statusId: record.status.id,
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
            render: () => null,
            width: 0,
            className: "hidden_сol",
        },
        {
            title: "№",
            key: "index",
            render: (_: any, __: any, index: number) => index + 1,
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
            render: (cities: { id: number, name: string }[] | null) => cities?.length ? cities.map(el => el.name).join(", ") : "-",
        },
        {
            title: "Роль",
            dataIndex: "role",
            key: "role",
            render: (role: { id: number, name: string } | null) => role?.name || "-",
        },
        {
            title: "Статус",
            dataIndex: "status",
            key: "status",
            render: (status: any) => (<Tag color={status?.color}>{status?.name}</Tag>),
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

    useEffect(() => {
        if (!isLoading)
            setDataUsers(data);
    }, [data, isLoading]);

    return (
        <Fragment>
            <Flex justify='space-between' gap={14}>
                <Title level={4} className='c-norm-title'>Користувачі</Title>
                <Button size='small' className='mob-btn-stan-none' type="primary" onClick={() => setDataModal((prev) => ({ ...prev, show: true }))}>+<span className='mob-btn-stan-none_span'>Додати</span></Button>
            </Flex>
            <Table
                className='c-table-mt-40'
                columns={columns}
                dataSource={dataUser?.data?.length ? dataUser.data : []}
                pagination={{
                    ...pagination,
                    total: dataUser?.total || 0,
                    showSizeChanger: true,
                }}
                onChange={(paginationData) => {
                    setPagination({
                        current: paginationData.current || 1,
                        pageSize: paginationData.pageSize || 10,
                        total: dataUser?.total || 0,
                    });
                }}
                size='small'
                rowKey="id"
                loading={isLoading}
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
                isLoadBtn={isLoadingCreate || isLoadingUpdate}
                mutateCreate={mutateCreate}
                mutateUpdate={mutateUpdate}
            />
        </Fragment>
    )
}