import { Flex, Typography, Button, Select, Table, Tag, Space, Input, DatePicker } from 'antd';
import { Fragment } from 'react/jsx-runtime';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { EditOutlined, TeamOutlined, CloseOutlined } from "@ant-design/icons";
import { useQuery } from '@tanstack/react-query';

import { GameEditModal } from '../components/modals/edit-game';
import { ListTeamModal } from '../components/modals/list-temas';
import { games } from '../api';
import { formattedDecoder, formattedGame } from '../helpers/format-data';
import { defaultDataModalGame } from "../constants/default-data";
import { useAppData } from '../store/appData';
import { useGetCitiesNow } from '../hooks/useGetCitiesNow';
import { getQueryStringGame } from '../helpers/get-query-games';

const { Title } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

const defaultDataModalTemaList = {
    show: false,
    id: null,
    name: '',
}

export const GamseContainer = () => {
    const [dataModalListTeam, setDataModalListTeam] = useState(defaultDataModalTemaList);
    const [dataTable, setDataTable] = useState<any>({ data: [] });
    const [dataModal, setDataModal] = useState(defaultDataModalGame);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
        total: 0,
    });
    const [filter, setFilter] = useState<any>({
        cities: [],
        statuses: [],
        search: '',
        dateFrom: null,
        dateTo: null,
    });

    const { fetchCities, citiesData, isLoadingCity } = useGetCitiesNow();
    const { statuses, user } = useAppData();
    const userModer = user?.role?.id === 1;

    const {
        isLoading,
        refetch,
        data,
    } = useQuery<any, Error>({
        queryKey: ['games', filter, pagination.current, pagination.pageSize],
        queryFn: () => games.getGames(`?${getQueryStringGame(filter, pagination)}`),
    });

    const handleSetFilter = (field: string, value: any) => {
        setFilter((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    }

    const handleCleanFilter = () => {
        if (user?.role?.id === 1) {
            setFilter({
                cities: [],
                statuses: [],
                search: '',
                dateFrom: null,
                dateTo: null,
            });
        } else {
            setFilter({
                cities: user?.city?.map((el: any) => el.id),
            });
        }
    }

    const debouncedSearchCity = (text: any) => {
        fetchCities({ search: text });
    }

    const hCloseModal = () => {
        setDataModal(defaultDataModalGame);
    }

    const hCloseModalListTeam = () => {
        setDataModalListTeam(defaultDataModalTemaList);
    }

    const handleOpenModalTeam = useCallback((record: any) => {
        setDataModalListTeam({
            show: true,
            id: record.id,
            name: record.name
        });
    }, []);

    const handleEdit = useCallback((record: any) => {
        setDataModal({
            show: true,
            data: {
                id: record.id,
                name: record.name,
                image: record.image,
                cityId: record.cityId,
                statusId: record.statusId,
                isPlaces: record.isPlaces,
                places: record.places,
                ...formattedDecoder(record.beginningDateTime),
                description: record.description,
            }
        });
    }, []);

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
            title: "Місто",
            dataIndex: "city",
            key: "city",
            render: (city: { id: number, name: string }) => city.name
        },
        {
            title: "Початок",
            dataIndex: "beginningDateTime",
            key: "beginningDateTime",
            render: (beginningDateTime: string) => formattedGame(beginningDateTime)
        },
        {
            title: "Місць",
            dataIndex: "places",
            key: "places",
            render: (places: number | null) => places ?? "-",
        },
        {
            title: "Команд",
            dataIndex: "teams",
            key: "teams_total",
            render: (teams: any[]) => teams.filter((el: any) => el.statusId === 1).length,
        },
        {
            title: "Скасували",
            dataIndex: "teams",
            key: "teams_cancelled",
            render: (teams: any[]) => teams.filter((el: any) => el.statusId === 5).length,
        },
        {
            title: "Заявок",
            dataIndex: "teams",
            key: "teams_application",
            render: (teams: any[]) => teams.filter((el: any) => el.statusId === 6).length,
        },
        {
            title: "Опис",
            dataIndex: "description",
            key: "description",
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
                    <Space>
                        <Button
                            color="cyan"
                            variant="solid"
                            icon={<TeamOutlined />}
                            size='small'
                            title="Команди"
                            onClick={() => handleOpenModalTeam(record)}
                        ></Button>
                        <Button
                            color="primary"
                            variant="solid"
                            icon={<EditOutlined />}
                            size='small'
                            title="Редагувати"
                            onClick={() => handleEdit(record)}
                        ></Button>
                    </Space>
                </Space>
            ),
        },
    ], [handleEdit, handleOpenModalTeam]);

    useEffect(() => {
        if (data) {
            setDataTable(data);
        }
    }, [data]);

    useEffect(() => {
        if (user?.role?.id === 1) {
            fetchCities({});
        }
    }, [user]);

    return (
        <Fragment>
            <Flex justify='space-between' gap={14}>
                <Title level={4} className='c-norm-title'>Всі</Title>
                <Button size='small' className='mob-btn-stan-none' type="primary" onClick={() => setDataModal((prev) => ({ data: defaultDataModalGame.data, show: true }))}>+<span className='mob-btn-stan-none_span'>Додати</span></Button>
            </Flex>
            <Flex className='c-flex-filter' gap={16} align='start' justify='space-between'>
                <Flex gap={16} wrap="wrap">
                    {
                        (userModer ? true : user?.city?.length > 1) && (
                            <Select
                                showSearch
                                mode="multiple"
                                size='small'
                                style={{ width: 160 }}
                                placeholder="Місто"
                                value={filter.cities}
                                optionFilterProp="label"
                                onSearch={userModer ? debouncedSearchCity : () => { }}
                                onChange={(value) => handleSetFilter('cities', value)}
                                filterOption={false}
                                options={(userModer ? citiesData?.data : user.city)?.map((el: any) => ({ label: el.name, value: el.id }))}
                            />
                        )
                    }

                    <Select
                        showSearch
                        mode="multiple"
                        size='small'
                        style={{ width: 160 }}
                        placeholder="Статус"
                        value={filter.statuses}
                        loading={isLoadingCity}
                        optionFilterProp="label"
                        onChange={(value) => handleSetFilter('statuses', value)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={statuses?.map((el: any) => ({ label: el.name, value: el.id }))}
                    />

                    <RangePicker
                        placeholder={['Дата від', 'Дата до']}
                        format="DD.MM.YYYY"
                        size='small'
                        style={{ width: 200 }}
                        value={[filter.dateFrom, filter.dateTo]}
                        onChange={(values) => {
                            handleSetFilter('dateFrom', values?.[0] || null);
                            handleSetFilter('dateTo', values?.[1] || null);
                        }}
                    />

                    <Flex>
                        <Search
                            size='small'
                            value={filter.search}
                            allowClear
                            enterButton
                            placeholder="Пошук по назві"
                            onChange={(e) => handleSetFilter('search', e.target.value)}
                            onSearch={(value) => handleSetFilter('search', value)}
                        />
                    </Flex>

                    <Flex gap={16}>
                        <Button
                            color="danger" variant="solid"
                            icon={<CloseOutlined />}
                            iconPosition={'start'}
                            size='small'
                            className='mob-btn-stan-none'
                            onClick={handleCleanFilter}
                        >
                        </Button>
                    </Flex>
                </Flex>
            </Flex>

            <Table
                className='c-table-mt-40'
                columns={columns}
                dataSource={dataTable?.data || []}
                pagination={{
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
                size='small'
                scroll={{ x: 1000 }}
                rowKey="id"
                loading={isLoading}
            />

            <GameEditModal
                isModalOpen={dataModal.show}
                hCloseModal={hCloseModal}
                data={dataModal.data}
                refetchReload={refetch}
            />

            <ListTeamModal
                isModalOpen={dataModalListTeam.show}
                gameId={dataModalListTeam.id || 0}
                nameGame={dataModalListTeam.name}
                hCloseModal={hCloseModalListTeam}
            />
        </Fragment>
    )
}