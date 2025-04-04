import { Modal, Tabs } from 'antd';
import { ListTeam } from '../list-team-modal';
import { ListRezerv } from '../list-rezerv-modal';

export const ListTeamModal = ({
    isModalOpen = false,
    data = {},
    hCloseModal = () => { },
}: {
    isModalOpen: boolean,
    hCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
    data: any;
}) => {
    return (
        <Modal
            title={'Назва гри'}
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
            <Tabs
                defaultActiveKey="1"
                type="card"
                size='small'
                style={{ marginBottom: 10, marginTop: 32 }}
                items={[
                    {
                        key: 'registration',
                        label: `Реєстрація ${5}`,
                        children: <ListTeam />
                    },
                    {
                        key: 'rezerv',
                        label: `Резерв ${0}`,
                        children: <ListRezerv />
                    }
                ]}
            />
        </Modal>
    )
}