import { Modal, Tabs, Flex, Button } from 'antd';
import { TableTeam } from '../table-team';
import { Fragment, useState } from 'react';

import { TeamEditModal } from './edit-team';
import { defaultDataModalTeam } from "../../constants/default-data";

export const ListTeamModal = ({
    isModalOpen = false,
    hCloseModal = () => { },
    refetchReload = () => { },
    gameId = 0,
    nameGame = '',
}: {
    isModalOpen: boolean,
    hCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
    refetchReload?: any;
    gameId: number;
    nameGame: string;
}) => {
    const [quantityTeam, setQuantityTeam] = useState<number>(0);
    const [quantityTeamReserv, setQuantityTeamReserv] = useState<number>(0);
    const [quantityTeamСanceled, setQuantityTeamСanceled] = useState<number>(0);
    const [dataModal, setDataModal] = useState(defaultDataModalTeam);
    const [updateGetRequest, setUpdateGetRequest] = useState<boolean>(false);
    const [updateGetRequestReserv, setUpdateGetRequestReserv] = useState<boolean>(false);
    const [updateGetRequestСanceled, setUpdateGetRequestСanceled] = useState<boolean>(false);
    const [activeKey, setActiveKey] = useState('registration');
    const hCloseModalEdit = () => {
        setDataModal(defaultDataModalTeam);
    }

    const handleRefetchReload = () => {
        setUpdateGetRequest(true);
        setUpdateGetRequestReserv(true);
        setUpdateGetRequestСanceled(true);
        refetchReload();
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

    const tabItems = [
        {
            key: 'registration',
            label: `Реєстрація ${quantityTeam}`,
            children: (<Fragment />)
        },
        {
            key: 'rezerv',
            label: `Заявки ${quantityTeamReserv}`,
            children: (<Fragment />)
        },
        {
            key: 'canceled',
            label: `Скасовані ${quantityTeamСanceled}`,
            children: (<Fragment />)
        }
    ];

    return (
        <Fragment>
            <Modal
                title={nameGame}
                open={isModalOpen}
                onCancel={hCloseModal}
                width={{
                    xs: '90%',
                    sm: '500px',
                    md: '600px',
                    lg: '800px',
                    xl: '95%',
                    xxl: '90%',
                }}
                footer={null}
                destroyOnClose
            >
                <Flex justify='end' gap={14} style={{marginTop: 20}}>
                    <Button
                        type="primary"
                        size='small'
                        className='mob-btn-stan-none'
                        onClick={() => setDataModal((prev) => ({ ...prev, show: true }))}
                    >+<span className='mob-btn-stan-none_span'>Додати команду</span></Button>
                </Flex>
                <Tabs
                    activeKey={activeKey}
                    onChange={(key) => setActiveKey(key)}
                    type="card"
                    size="small"
                    style={{ marginBottom: 10, marginTop: 32 }}
                    items={tabItems}
                />
                <div>
                    {
                        <div style={{ display: (activeKey == "registration" ? 'block' : 'none') }}>
                            <TableTeam
                                filter={{
                                    statuses: [1],
                                    games: [gameId]
                                }}
                                limit={100}
                                handleOpenEdit={handleOpenEdit}
                                isModal={true}
                                setQuantity={(quantity: number) => setQuantityTeam(quantity)}
                                keyQuery='registratio'
                                updateGetRequest={updateGetRequest}
                                setUpdateGetRequest={setUpdateGetRequest}
                            />
                        </div>
                    }

                    {
                        <div style={{ display: (activeKey == "rezerv" ? 'block' : 'none') }}>
                            <TableTeam
                                filter={{
                                    statuses: [6],
                                    games: [gameId]
                                }}
                                limit={100}
                                handleOpenEdit={handleOpenEdit}
                                isModal={true}
                                setQuantity={(quantity: number) => setQuantityTeamReserv(quantity)}
                                keyQuery='rezerv'
                                updateGetRequest={updateGetRequestReserv}
                                setUpdateGetRequest={setUpdateGetRequestReserv}
                            />
                        </div>
                    }

                    {
                        <div style={{ display: (activeKey == "canceled" ? 'block' : 'none') }}>
                            <TableTeam
                                filter={{
                                    statuses: [5],
                                    games: [gameId]
                                }}
                                limit={100}
                                handleOpenEdit={handleOpenEdit}
                                isModal={true}
                                setQuantity={(quantity: number) => setQuantityTeamСanceled(quantity)}
                                keyQuery='cansled'
                                updateGetRequest={updateGetRequestСanceled}
                                setUpdateGetRequest={setUpdateGetRequestСanceled}
                            />
                        </div>
                    }
                </div>
            </Modal>

            <TeamEditModal
                isModalOpen={dataModal.show}
                hCloseModal={hCloseModalEdit}
                data={dataModal.data}
                refetchReload={handleRefetchReload}
            />
        </Fragment>
    );
};
