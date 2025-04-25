import { Flex, Typography, Button, Table, Tag, Space } from 'antd';
import { Fragment } from 'react/jsx-runtime';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

import { EditOutlined } from "@ant-design/icons";
import { CityEditModal } from '../components/modals/city-edit';

import {
    cities,
} from '../api';
import { useNoteStore } from '../store/note';

const { Title } = Typography;

const defaultDataModal = {
    show: false,
    data: {
        id: null,
        name: '',
        timeZoneId: null,
        statusId: 1,
        timeZone: null
    }
};

export const CitiesContainer = () => {
    const [dataModal, setDataModal] = useState(defaultDataModal);
    const [dataCities, setDataCities] = useState<any>(null);
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
        queryKey: ['cities', pagination.current, pagination.pageSize],
        queryFn: () => cities.getCities({ page: pagination.current, limit: pagination.pageSize }),
    });

    const {
        mutate: mutateCreate,
        isPending: isLoadingCreate
    } = useMutation({
        mutationFn: cities.create,
        onSuccess: (data) => {
            if (data?.message) {
                return setMessage(data?.message.join(", "));
            }

            refetch();
            hCloseModal();
            setMessage('Місто успішно додано', 'success');
        },
    });

    const {
        mutate: mutateUpdate,
        isPending: isLoadingUpdate
    } = useMutation({
        mutationFn: cities.update,
        onSuccess: (data) => {
            if (data?.message) {
                return setMessage(data?.message.join(", "));
            }

            refetch();
            hCloseModal();
            setMessage('Місто успішно оновленно', 'success');
        },
    });

    const handleEdit = useCallback((record: any) => {
        setDataModal({
            show: true,
            data: {
                id: record.id,
                name: record.name,
                timeZoneId: record.tineZone.id,
                statusId: record.status.id,
                // --
                timeZone: record.tineZone
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
            title: "Назва",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Часовий пояс ",
            dataIndex: "tineZone",
            key: "tineZone",
            render: (timeZone: any) => timeZone.name,
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
            setDataCities(data);
    }, [data, isLoading]);

    return (
        <Fragment>
            <Flex justify='space-between' gap={14}>
                <Title level={4} className='c-norm-title'>Міста</Title>
                <Button type="primary" className='mob-btn-stan-none' size='small' onClick={() => setDataModal((prev) => ({ ...prev, show: true }))}>+<span className='mob-btn-stan-none_span'>Додати</span></Button>
            </Flex>
            <Table
                className='c-table-mt-40'
                columns={columns}
                rowKey="id"
                dataSource={dataCities?.data?.length ? dataCities.data : []}
                pagination={{
                    ...pagination,
                    total: dataCities?.total || 0,
                    showSizeChanger: true,
                }}
                onChange={(paginationData) => {
                    setPagination({
                        current: paginationData.current || 1,
                        pageSize: paginationData.pageSize || 10,
                        total: dataCities?.total || 0,
                    });
                }}
                size='small'
                scroll={{ x: 1000 }}
                loading={isLoading}
                style={{ maxWidth: 1000 }}
                onRow={(record) => ({
                    onClick: () => handleEdit(record),
                    style: { cursor: "pointer" }
                })}
            />

            <CityEditModal
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