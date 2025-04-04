import { useState, useCallback, useMemo, Fragment } from 'react';
import { Flex, Typography, Button, Table, Tag, Space, Select } from 'antd';
import { EditOutlined, SearchOutlined, CloseOutlined, DownloadOutlined } from "@ant-design/icons";

const data = [
    ...[
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
    ],
    ...([...new Array(5)].map((_, index: number) => ({
        key: index + 3,
        id: index + 3,
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
    })))
];


export const ListTeam = () => {
    const handleEdit = useCallback((record: any) => {
        console.log("Редагування запису:", record);

        // setDataModal({
        //     show: true,
        //     data: {
        //         id: record.id,
        //         name: record.name,
        //         email: record.email,
        //         city: record.city.id,
        //         role: record.role.id,
        //         active: record.active,
        //         password: null,
        //     }
        // });
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
            <Flex justify='end' gap={14}>
                <Button
                    type="primary"
                    size='small'
                    className='mob-btn-stan-none'
                    // onClick={() => setDataModal((prev) => ({ ...prev, show: true }))}
                >+<span className='mob-btn-stan-none_span'>Додати</span></Button>
            </Flex>
            <Table
                columns={columns}
                dataSource={data}
                loading={false}
                pagination={false}
                size='small'
                scroll={{ x: 1000 }}
                style={{
                    marginTop: 32
                }}
                onRow={(record) => ({
                    onClick: () => handleEdit(record),
                    style: { cursor: "pointer" }
                })}
                rowClassName={(record) => (record.active ? "" : "inactive-row")}
            />
        </Fragment>
    )
}