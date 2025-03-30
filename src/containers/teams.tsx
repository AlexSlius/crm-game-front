import { Flex, Typography, Button, Table, Tag, Space, Select } from 'antd';
import { Fragment } from 'react/jsx-runtime';
import { useCallback, useMemo } from 'react';
import { EditOutlined, SearchOutlined, CloseOutlined, DownloadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const data = [
    {
        key: 1,
        id: 1,
        game: "Веселухи",
        time: "26.06.2024 12:06:56",
        team: 'Круті',
        captain: 'Василь',
        phone: "+380993794824",
        quantity: 10,
        quantityNew: 6,
        city: 'Львів',
        wish: "Тут можна залишити побажання на гру",
        active: false,
        note: "Примітка для огранізатора"
    },
    {
        key: 2,
        id: 2,
        game: "Веселухи",
        time: "26.06.2024 12:06:56",
        team: 'Круті',
        captain: 'Василь',
        phone: "+380993794824",
        quantity: 10,
        quantityNew: 6,
        city: 'Львів',
        wish: "Тут можна залишити побажання на гру",
        active: true,
        note: "Примітка для огранізатора"
    },
];


export const TeamsContainer = () => {
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
            title: "Гра",
            dataIndex: "game",
            key: "game",
        },
        {
            title: "Час",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Команда",
            dataIndex: "team",
            key: "team",
        },
        {
            title: "Капітан",
            dataIndex: "captain",
            key: "captain",
        },
        {
            title: "Телефон",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Кіл. уч.",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Кіл. уч. (нова)",
            dataIndex: "quantityNew",
            key: "quantityNew",
        },
        {
            title: "Місто",
            dataIndex: "city",
            key: "city",
        },
        {
            title: "Побажання",
            dataIndex: "wish",
            key: "wish",
        },
        {
            title: "Примітка",
            dataIndex: "note",
            key: "note",
        },
        {
            title: "Статус",
            dataIndex: "active",
            key: "status",
            render: (active: boolean) =>
                active ? <Tag color="green">Активний</Tag> : <Tag color="red">Скасований</Tag>,
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
                <Button type="primary">+Додати</Button>
            </Flex>
            <Flex className='c-flex-filter' gap={16} align='start'>
                <Select
                    showSearch
                    mode="tags"
                    size='small'
                    style={{ width: 160 }}
                    placeholder="Гра"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                        {
                            value: '1',
                            label: 'Вишукані',
                        },
                    ]}
                />

                <Select
                    showSearch
                    mode="tags"
                    size='small'
                    style={{ width: 160 }}
                    placeholder="Команда"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                        {
                            value: '1',
                            label: 'Вишукані1',
                        },
                        {
                            value: '2',
                            label: 'Вишукані2',
                        },
                    ]}
                />

                <Select
                    showSearch
                    mode="tags"
                    size='small'
                    style={{ width: 160 }}
                    placeholder="Капітан"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                        {
                            value: '1',
                            label: 'Вишукані',
                        },
                    ]}
                />

                <Select
                    showSearch
                    mode="tags"
                    size='small'
                    style={{ width: 160 }}
                    placeholder="Телефон"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                        {
                            value: '1',
                            label: 'Вишукані',
                        },
                    ]}
                />

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
                            label: 'Вишукані',
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
                            label: 'Вишукані',
                        },
                    ]}
                />
            </Flex>

            <Flex className='c-flex-btns-feilter' justify='space-between' gap={20}>
                <Flex gap={16}>
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        iconPosition={'start'}
                    >
                        Пошук по фільтру
                    </Button>
                    <Button
                        color="danger" variant="solid"
                        icon={<CloseOutlined />}
                        iconPosition={'start'}
                    >
                        Скинути фільтр
                    </Button>
                </Flex>
                <Flex>
                    <Button
                        color="cyan"
                        variant="solid"
                        icon={<DownloadOutlined />}
                    >
                        Скачати таблицю
                    </Button>
                </Flex>
            </Flex>
            <Table
                className='c-table-mt-40'
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 20 }}
                size='small'
                scroll={{ x: 1000 }}
                onRow={(record) => ({
                    onClick: () => handleEdit(record),
                    style: { cursor: "pointer" }
                })}
                rowClassName={(record) => (record.active ? "" : "inactive-row")}
            />
        </Fragment>
    )
}