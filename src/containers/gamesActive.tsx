import { Flex, Typography, Button, Progress, Space, Row, Col, Card } from 'antd';
import { useState, useCallback } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { useQuery } from '@tanstack/react-query';
import { EditOutlined, TeamOutlined } from "@ant-design/icons";
import { GameEditModal } from '../components/modals/edit-game';
import { ListTeamModal } from '../components/modals/list-temas';
import { games } from '../api';
import { formattedDecoder, formattedGame } from '../helpers/format-data';
import { defaultDataModalGame } from "../constants/default-data";

const { Title } = Typography;

const defaultDataModalTemaList = {
    show: false,
    id: null,
    name: '',
}

export const GamsesActiveContainer = () => {
    const params = new URLSearchParams();

    const [dataModal, setDataModal] = useState(defaultDataModalGame);
    const [dataModalListTeam, setDataModalListTeam] = useState(defaultDataModalTemaList);

    params.append('statuses', '1');
    params.append('statuses', '3');
    params.append('limit', '100');

    const {
        refetch,
        data,
    } = useQuery<any, Error>({
        queryKey: ['games'],
        queryFn: () => games.getGames(`?${params.toString()}`),
    });

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

    const handleOpenModalTeam = useCallback((record: any) => {
        setDataModalListTeam({
            show: true,
            id: record.id,
            name: record.name,
        });
    }, []);

    const hCloseModal = () => {
        setDataModal(defaultDataModalGame);
    }

    const hCloseModalListTeam = () => {
        setDataModalListTeam(defaultDataModalTemaList);
    }

    return (
        <Fragment>
            <Flex justify='space-between' gap={14}>
                <Title level={4} className='c-norm-title'>Активні</Title>
                <Button type="primary" size='small' className='mob-btn-stan-none' onClick={() => setDataModal((prev) => ({ data: defaultDataModalGame.data, show: true }))}>+<span className='mob-btn-stan-none_span'>Додати</span></Button>
            </Flex>
            <Row gutter={[24, 24]} className='c-d-mt-24'>
                {
                    data?.data?.map((itemCard: any) => {
                        const occupiedTeams = itemCard.teams.filter((el: any) => el.statusId === 1).length;
                        const percent = itemCard.places > 0 ? Math.round((occupiedTeams * 100) / itemCard.places) : 0;

                        return (
                            <Col key={itemCard.id} xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
                                <Card
                                    title={itemCard.name}
                                    variant="borderless"
                                    className='c-card-item'
                                    extra={
                                        <Space>
                                            <Button
                                                color="cyan"
                                                variant="solid"
                                                icon={<TeamOutlined />}
                                                size='small'
                                                title="Команди"
                                                onClick={() => handleOpenModalTeam(itemCard)}
                                            ></Button>
                                            <Button
                                                color="primary"
                                                variant="solid"
                                                icon={<EditOutlined />}
                                                size='small'
                                                title="Редагувати"
                                                onClick={() => handleEdit(itemCard)}
                                            ></Button>
                                        </Space>
                                    }
                                >
                                    <Flex gap={20} vertical>
                                        <Space direction="vertical" className='c-card-space'>
                                            <Flex className='c-c-flex-inf'>
                                                {
                                                    itemCard.isPlaces && <div>Кількість місць: {itemCard.places}</div>
                                                }
                                                <div>Зареєструвалось: {occupiedTeams}</div>
                                                <div>Скасували: {itemCard.teams.filter((el: any) => (el.statusId === 5)).length}</div>
                                                <div>Заявок: {itemCard.teams.filter((el: any) => (el.statusId === 6)).length}</div>
                                                <div>Місто: {itemCard.city.name}</div>
                                                <div>Початок гри: {formattedGame(itemCard.beginningDateTime)}</div>
                                            </Flex>
                                            {
                                                itemCard.isPlaces && itemCard.places > 0 && (
                                                    <Progress percent={percent} />
                                                )
                                            }
                                        </Space>
                                    </Flex>
                                </Card>
                            </Col>
                        )
                    })
                }

                {
                    !data?.data?.length && (
                        <Col xs={24}>
                            <div className='empty-cart'>
                                Активних ігор немає...
                            </div>
                        </Col>
                    )
                }
            </Row>

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
                refetchReload={refetch}
            />
        </Fragment>
    )
}