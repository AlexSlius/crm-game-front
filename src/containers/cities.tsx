import { Flex, Typography, Button, Table, Tag, Space } from 'antd';
import { Fragment } from 'react/jsx-runtime';
import { useCallback, useMemo, useState } from 'react';
import { EditOutlined } from "@ant-design/icons";
import { CityEditModal } from '../components/modals/city-edit';

const { Title } = Typography;

const data = [
    { key: "1", id: 1, name: "Київ", timeZona: "UTC+5", active: false },
    { key: "2", id: 2, name: "Одеса", timeZona: "UTC-1", active: true },
    { key: "3", id: 3, name: "Львів", timeZona: "UTC+0", active: true },
    { key: "4", id: 4, name: "Суми", timeZona: "UTC+2", active: true },
];

const defaultDataModal = {
    show: false,
    data: {
        id: null,
        name: '',
        timeZona: '',
        active: true,
    }
};

export const CitiesContainer = () => {
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
                timeZona: record.timeZona,
                active: record.active,
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
            title: "Назва",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Часовий пояс ",
            dataIndex: "timeZona",
            key: "timeZona",
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
                <Title level={4} className='c-norm-title'>Міста</Title>
                <Button type="primary" size='small' onClick={() => setDataModal((prev) => ({...prev, show: true}))}>+Додати</Button>
            </Flex>
            <Table
                className='c-table-mt-40'
                columns={columns}
                dataSource={data}
                pagination={pagination}
                size='small'
                scroll={{ x: 1000 }}
                loading={loading}
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
                setDataModal={setDataModal}
            />
        </Fragment>
    )
}