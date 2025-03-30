import { Flex, Typography, Button, Table, Tag, Space } from 'antd';
import { Fragment } from 'react/jsx-runtime';
import { useCallback, useMemo } from 'react';
import { EditOutlined } from "@ant-design/icons";

const { Title } = Typography;

const data = [
    { key: "1", id: 1, name: "Київ", belt: "UTC+5", active: false },
    { key: "2", id: 2, name: "Одеса", belt: "UTC-1", active: true },
    { key: "3", id: 3, name: "Львів", belt: "UTC+0", active: true },
    { key: "4", id: 4, name: "Суми", belt: "UTC+2", active: true },
];


export const CitiesContainer = () => {
    const handleEdit = useCallback((record: any) => {
        console.log("Редагування запису:", record);
    }, []);

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
            dataIndex: "belt",
            key: "belt",
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
                <Button type="primary">+Додати</Button>
            </Flex>
            <Table
                className='c-table-mt-40'
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 20 }}
                size='small'
                scroll={{ x: 1000 }}
                style={{ maxWidth: 1000 }}
                onRow={(record) => ({
                    onClick: () => handleEdit(record),
                    style: { cursor: "pointer" } 
                })}
            />
        </Fragment>
    )
}