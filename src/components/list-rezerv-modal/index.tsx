import { useState, useCallback, useMemo } from 'react';
import { Flex, Typography, Button, Table, Tag, Space, Select, Checkbox } from 'antd';
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
    ...([...new Array(2)].map((_, index: number) => ({
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

export const ListRezerv = () => {
    const handleEdit = useCallback((record: any) => {
    }, []);

    const columns = useMemo(() => [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Час",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Телефон",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Оброблено ?",
            key: "actions",
            render: (_: any, record: any) => (
                <Space>
                    <Checkbox />
                </Space>
            ),
        },
    ], [handleEdit]);

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                loading={false}
                pagination={false}
                size='small'
                scroll={{ x: 600 }}
                style={{ maxWidth: 600 }}
                rowClassName={(record) => (record.active ? "" : "inactive-row")}
            />
        </div>
    )
}