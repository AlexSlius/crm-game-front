import { Button, Typography, Flex, Modal } from 'antd';
import { useMutation } from '@tanstack/react-query';

import {
    auth
} from '../../api';
import { useNoteStore } from '../../store/note';

import CONSTANTS from "../../constants/routers.json";


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
    const { setMessage } = useNoteStore();

    const { mutate } = useMutation({
        mutationFn: auth.logout,
        onSuccess: (data) => {
            if (data?.message) {
                return setMessage(data.message.join(", "));
            }

            if (!!data?.status) {
                localStorage.removeItem('token');
                window.location.href = CONSTANTS.auth;
            }
        },
    });

    const handleExit = () => {
        mutate();
    }

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
            destroyOnClose
        >
            {
                !!desc && <Title level={4} className='c-t-c'>{desc}</Title>
            }
            <Flex gap={20} justify='center' className='c-row-mod-bot'>
                <Button onClick={hCloseModal}>Ні</Button>
                <Button
                    type="primary"
                    loading={false}
                    onClick={handleExit}
                >Так</Button>
            </Flex>
        </Modal>
    )
}