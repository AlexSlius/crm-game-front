import { Button, Typography, Flex, Modal } from 'antd';

const { Title } = Typography;

export const ConfirmationlogoutModal = ({
    title = "",
    desc = "",
    isModalOpen = false,
    hCloseModal = () => { }
}: {
    title?: string;
    desc?: string;
    isModalOpen: boolean;
    hCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {

    return (
        <Modal
            title={title}
            open={isModalOpen}
            onCancel={hCloseModal}
            width={{
                xs: '90%',
                sm: '400px',
                md: '400px',
                lg: '400px',
                xl: '400px',
                xxl: '400px',
            }}
            footer={null}
        >
            {
                !!desc && <Title level={4} className='c-t-c'>{desc}</Title>
            }
            <Flex gap={20} justify='center' className='c-row-mod-bot'>
                <Button onClick={hCloseModal}>Ні</Button>
                <Button
                    type="primary"
                    loading={false}
                >Так</Button>
            </Flex>
        </Modal>
    )
}