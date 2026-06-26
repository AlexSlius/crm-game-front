import { useState, useMemo, useEffect } from 'react';
import { Button, Table, Tag, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery } from '@tanstack/react-query';

import { formattedGame } from '../../helpers/format-data';
import { teams } from '../../api';
import { getQueryStringTeams } from '../../helpers/get-query-teams';
import { switchColorRowByStatus } from '../../helpers/color-row-table';


export const TableTeam = ({
    filter = null,
    limit = 20,
    isModal = false,
    keyQuery = 'teams',
    updateGetRequest = false,
    setUpdateGetRequest = () => { },
    handleOpenEdit = () => { },
    handleDelete = () => { },
    deletingId = null,
    setQuantity = () => { }
}: {
    filter: any;
    limit?: number;
    keyQuery?: string;
    isModal?: boolean;
    updateGetRequest?: boolean;
    handleOpenEdit?: Function;
    handleDelete?: Function;
    deletingId?: number | string | null;
    setUpdateGetRequest?: Function;
    setQuantity?: Function;
}) => {
    const [dataTable, setDataTable] = useState<any>({ data: [] });
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: limit,
        total: 0,
    });

    const {
        isLoading,
        refetch,
        data,
    } = useQuery<any, Error>({
        queryKey: [keyQuery, filter, pagination.current, pagination.pageSize],
        queryFn: () => teams.getTeams(`?${getQueryStringTeams(filter, pagination)}`),
    });

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
            title: "Гра",
            dataIndex: "game",
            key: "game_name",
            render: (game: { name: string }) => game.name
        },
        {
            title: "Команда",
            dataIndex: "name",
            key: "name",
            render: (name: any) => name || '-'
        },
        {
            title: "Капітан",
            dataIndex: "captain",
            key: "captain",
            render: (captain: any) => captain || '-'
        },
        {
            title: "Телефон",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Кіл. уч.",
            dataIndex: "players",
            key: "players",
        },
        {
            title: "Кіл. уч. (нова)",
            dataIndex: "playersNew",
            key: "playersNew",
            render: (playersNew: number) => <span className={`${playersNew > 0 ? "new_player" : ""}`}>{playersNew}</span>
        },
        {
            title: "Місто",
            dataIndex: "city",
            key: "city",
            render: (city: { name: string }) => city.name
        },
        {
            title: "Час",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt: string) => formattedGame(createdAt)
        },
        {
            title: "Побажання",
            dataIndex: "wish",
            key: "wish",
            render: (wish: any) => wish || '-'
        },
        {
            title: "Примітка",
            dataIndex: "note",
            key: "note",
            render: (note: any) => note || '-'
        },
        {
            title: "Статус",
            dataIndex: "status",
            key: "status",
            render: (status: { name: string, color: string, id: number }) => <Tag color={status.color}>{status.name}</Tag>
        },
        {
            title: "Дії",
            key: "actions",
            render: (_: any, record: any) => (
                <Space onClick={(e) => e.stopPropagation()}>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size='small'
                        onClick={() => handleOpenEdit(record)}
                    />
                    <Popconfirm
                        title="Видалити команду?"
                        description="Цю дію неможливо скасувати"
                        okText="Так"
                        cancelText="Ні"
                        okButtonProps={{ danger: true }}
                        onConfirm={() => handleDelete(record)}
                    >
                        <Button
                            danger
                            type="primary"
                            icon={<DeleteOutlined />}
                            size='small'
                            loading={deletingId === record.id}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ], [handleOpenEdit, handleDelete, deletingId]);

    useEffect(() => {
        if (data) {
            setDataTable(data);
            setQuantity(data?.data?.length || 0);

            setUpdateGetRequest(false);
        }
    }, [data]);

    useEffect(() => {
        if (updateGetRequest) {
            refetch();
        }
    }, [updateGetRequest])

    return (
        <Table
            className='c-table-mt-40'
            columns={columns}
            dataSource={dataTable?.data}
            loading={isLoading}
            pagination={isModal ? false : {
                ...pagination,
                total: dataTable?.total || 0,
                showSizeChanger: true,
            }}
            onChange={(paginationData) => {
                setPagination({
                    current: paginationData.current || 1,
                    pageSize: paginationData.pageSize || 20,
                    total: dataTable?.total || 0,
                });
            }}
            rowKey="id"
            size='small'
            scroll={{ x: 1000 }}
            onRow={(record) => ({
                onClick: () => handleOpenEdit(record),
                style: { cursor: "pointer" }
            })}
            rowClassName={(record) => switchColorRowByStatus(record.status.id)}
        />
    )
}