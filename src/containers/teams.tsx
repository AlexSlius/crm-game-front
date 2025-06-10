import { useState, useEffect } from 'react';
import { Flex, Typography, Button, Select, DatePicker } from 'antd';
import { Fragment } from 'react/jsx-runtime';
import { CloseOutlined, DownloadOutlined } from "@ant-design/icons";
import { useQuery } from '@tanstack/react-query';

import { TeamEditModal } from '../components/modals/edit-team';
import { TableTeam } from '../components/table-team';
import { useAppData } from '../store/appData';
import { useGetCitiesNow } from '../hooks/useGetCitiesNow';
import { teams } from '../api';
import { getQueryStringTeams } from '../helpers/get-query-teams';

import { defaultDataModalTeam } from "../constants/default-data";
import { handleExportFile } from '../helpers/export-file';

const { RangePicker } = DatePicker;
const { Title } = Typography;

export const TeamsContainer = () => {
    const [updateGetRequest, setUpdateGetRequest] = useState<boolean>(false);
    const [isLoadBtnExport, setLoadBtnExport] = useState<boolean>(false);
    const [dataModal, setDataModal] = useState(defaultDataModalTeam);

    const [filter, setFilter] = useState<any>({
        cities: [],
        statuses: [],
        games: [],
        names: [],
        captains: [],
        phones: [],
        dateFrom: null,
        dateTo: null,
    });

    const { fetchCities, citiesData, isLoadingCity } = useGetCitiesNow();
    const { statuses, user } = useAppData();
    const userModer = user?.role?.id === 1;

    const {
        refetch: refetchFilter,
        data: dataFilter,
    } = useQuery<any, Error>({
        queryKey: ['filterTeam'],
        queryFn: () => teams.getFilter(),
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
        setDataModal(defaultDataModalTeam);
    }

    const handleOpenEdit = (data: any) => {
        setDataModal({
            show: true,
            data: {
                ...data,
                gameId: data.gameId,
                city: data.city.name,
                statusId: data.statusId,
            }
        });
    }

    const refetchReload = () => {
        refetchFilter();
        setUpdateGetRequest(true);
    }

    useEffect(() => {
        if (user?.role?.id === 1) {
            fetchCities({});
        }
    }, [user]);

    return (
        <Fragment>
            <Flex justify='space-between' gap={14}>
                <Title level={4} className='c-norm-title'>Користувачі</Title>
                <Button
                    type="primary"
                    size='small'
                    className='mob-btn-stan-none'
                    onClick={() => setDataModal((prev) => ({ ...prev, show: true }))}
                >+<span className='mob-btn-stan-none_span'>Додати</span></Button>
            </Flex>
            <Flex className='c-flex-filter' gap={16} align='start' wrap="wrap">
                <Select
                    showSearch
                    size='small'
                    mode="multiple"
                    style={{ width: 180 }}
                    placeholder="Гра"
                    optionFilterProp="label"
                    value={filter.games}
                    onChange={(value) => handleSetFilter('games', value)}
                    filterSort={(optionA, optionB) =>
                        String(optionA?.label).toLowerCase().localeCompare(String(optionB?.label).toLowerCase())
                    }
                    options={dataFilter?.games?.map((el: any) => ({ label: el.name, value: el.id }))}
                />

                <Select
                    showSearch
                    size='small'
                    mode="tags"
                    style={{ width: 180 }}
                    placeholder="Команда"
                    optionFilterProp="label"
                    value={filter.names}
                    onChange={(value) => handleSetFilter('names', value)}
                    filterSort={(optionA, optionB) =>
                        String(optionA?.label).toLowerCase().localeCompare(String(optionB?.label).toLowerCase())
                    }
                    options={dataFilter?.names?.map((name: any) => ({ label: name, value: name }))}
                />

                <Select
                    showSearch
                    size='small'
                    mode="tags"
                    style={{ width: 180 }}
                    placeholder="Капітан"
                    optionFilterProp="label"
                    value={filter.captains}
                    onChange={(value) => handleSetFilter('captains', value)}
                    filterSort={(optionA, optionB) =>
                        String(optionA?.label).toLowerCase().localeCompare(String(optionB?.label).toLowerCase())
                    }
                    options={dataFilter?.captains?.map((name: any) => ({ label: name, value: name }))}
                />

                <Select
                    showSearch
                    mode="tags"
                    size='small'
                    style={{ width: 180 }}
                    placeholder="Телефон"
                    optionFilterProp="label"
                    value={filter.phones}
                    onChange={(value) => handleSetFilter('phones', value)}
                    filterSort={(optionA, optionB) =>
                        String(optionA?.label).toLowerCase().localeCompare(String(optionB?.label).toLowerCase())
                    }
                    options={dataFilter?.phones?.map((name: any) => ({ label: name, value: name }))}
                />

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
                    options={statuses?.filter((status: { id: number }) => [1, 6, 4, 5].includes(status.id)).map((el: any) => ({ label: el.name, value: el.id }))}
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

                <Flex gap={16}>
                    <Button
                        color="danger" variant="solid"
                        icon={<CloseOutlined />}
                        iconPosition={'start'}
                        size='small'
                        className='mob-btn-stan-none'
                        onClick={handleCleanFilter}
                    />
                </Flex>
                <Flex>
                    <Button
                        color="cyan"
                        variant="solid"
                        icon={<DownloadOutlined />}
                        loading={isLoadBtnExport}
                        onClick={() => { handleExportFile(`?${getQueryStringTeams(filter)}`, setLoadBtnExport); }}
                        size='small'
                        className='mob-btn-stan-none'
                    />
                </Flex>
            </Flex>

            <TableTeam
                filter={filter}
                handleOpenEdit={handleOpenEdit}
                updateGetRequest={updateGetRequest}
                setUpdateGetRequest={setUpdateGetRequest}
            />

            <TeamEditModal
                isModalOpen={dataModal.show}
                hCloseModal={hCloseModal}
                data={dataModal.data}
                refetchReload={refetchReload}
            />
        </Fragment>
    )
}