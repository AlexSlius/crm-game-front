import { Form, Input, Button, Modal } from 'antd';
import { useMutation } from '@tanstack/react-query';

import {
    user
} from '../../api';
import { useNoteStore } from '../../store/note';

export const ResetPassword = ({
    isModalOpen = false,
    hCloseModal = () => { },
}: {
    isModalOpen: boolean,
    hCloseModal: Function,
}) => {
    const { setMessage } = useNoteStore();

    const {
        mutate,
        isPending,
    } = useMutation({
        mutationFn: user.forgotPassword,
        onSuccess: (data) => {
            if (data?.data?.status) {
                setMessage('Пароль надіслано на пошту', 'success');
                hCloseModal();
            } else {
                setMessage('Не вийшло надіслати пароль, перевірь пошту');
            }
        },
    });

    const handleCloseModal = () => {
        hCloseModal();
    }

    const handleSubmit = (values: any) => {
        mutate(values.email);
    };

    return (
        <Modal
            title="Забули пароль ?"
            open={isModalOpen}
            onCancel={handleCloseModal}
            width={{
                xs: '90%',
                sm: '448px',
                md: '448px',
                lg: '448px',
                xl: '448px',
                xxl: '448px',
            }}
            footer={null}
            destroyOnClose
        >
            <Form
                name="reset"
                layout="vertical"
                initialValues={{
                    email: "",
                }}
                className="c-f-modal-reset"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Пошта"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Поле пошта обов'язкове!"
                        }, {
                            type: "email",
                            message: "Введіть коректну електронну пошту!"
                        }
                    ]}
                >
                    <Input placeholder="email@gmail.com" />
                </Form.Item>

                <Form.Item className="c-wr-button-bot">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isPending}
                        block>Отримати пароль</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}