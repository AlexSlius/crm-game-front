import { Flex, Typography, Button, Select, Table, Tag, Space, Input } from 'antd';
import { Fragment } from 'react/jsx-runtime';
import { useCallback, useMemo, useState } from 'react';
import { EditOutlined, TeamOutlined, SearchOutlined, CloseOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Search } = Input;

const data = [
    { key: "1", id: 1, name: "Назва гри", city: "Львів", beginning: '26.06.2024 12:06:56', description: "Ну що ж, ви готові?😏", active: false },
    { key: "2", id: 2, name: "Назва гри", city: "Львів", beginning: '26.06.2024 12:06:56', description: "Ну що ж, ви готові?😏", active: true },
    { key: "3", id: 3, name: "Назва гри", city: "Львів", beginning: '26.06.2024 12:06:56', description: "Ну що ж, ви готові?😏", active: true },
    { key: "4", id: 4, name: "Назва гри", city: "Львів", beginning: '26.06.2024 12:06:56', description: "Ну що ж, ви готові?😏", active: true },
];


export const GamseContainer = () => {
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

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
            title: "Місто",
            dataIndex: "city",
            key: "city",
        },
        {
            title: "Початок",
            dataIndex: "beginning",
            key: "beginning",
        },
        {
            title: "Опис",
            dataIndex: "description",
            key: "description",
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
                    <Space>
                        <Button
                            color="cyan"
                            variant="solid"
                            icon={<TeamOutlined />}
                            size='small'
                            title="Команди"
                        ></Button>
                        <Button
                            color="primary"
                            variant="solid"
                            icon={<EditOutlined />}
                            size='small'
                            title="Редагувати"
                        ></Button>
                    </Space>
                </Space>
            ),
        },
    ], [handleEdit]);

    return (
        <Fragment>
            <Flex justify='space-between' gap={14}>
                <Title level={4} className='c-norm-title'>Всі</Title>
                <Button size='small' type="primary">+Додати</Button>
            </Flex>
            <Flex className='c-flex-filter' gap={16} align='start' justify='space-between'>
                <Flex gap={16}>
                    <Select
                        showSearch
                        mode="tags"
                        size='small'
                        style={{ width: 160 }}
                        placeholder="Місто"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[
                            {
                                value: '1',
                                label: 'Одеса',
                            },
                            {
                                value: '2',
                                label: 'Київ',
                            },
                        ]}
                    />

                    <Select
                        showSearch
                        mode="tags"
                        size='small'
                        style={{ width: 160 }}
                        placeholder="Статус"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[
                            {
                                value: '1',
                                label: 'Активний',
                            },
                            {
                                value: '1',
                                label: 'Неактивний',
                            },
                        ]}
                    />

                    <Flex gap={16}>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            iconPosition={'start'}
                            size='small'
                        >
                            Пошук по фільтру
                        </Button>
                        <Button
                            color="danger" variant="solid"
                            icon={<CloseOutlined />}
                            iconPosition={'start'}
                            size='small'
                        >
                            Скинути фільтр
                        </Button>
                    </Flex>
                </Flex>
                <Flex>
                    <Search
                        size='small'
                        placeholder="Пошук по назві"
                        onSearch={(onSearch) => { console.log(onSearch) }}
                        enterButton
                    />
                </Flex>
            </Flex>
            <Table
                className='c-table-mt-40'
                columns={columns}
                dataSource={data}
                pagination={pagination}
                size='small'
                scroll={{ x: 1000 }}
                loading={loading}
                onRow={(record) => ({
                    onClick: () => handleEdit(record),
                    style: { cursor: "pointer" }
                })}
            />
        </Fragment>
    )
}