import { Form, Input, Button, Modal } from 'antd';
import { useMutation } from "@tanstack/react-query";

import { user } from '../../api';
import { useNoteStore } from '../../store/note';
import { useAppData } from '../../store/appData';

export const ChangePasswordModal = ({
    isModalOpen = false,
    hCloseModal = () => { },
}: {
    isModalOpen: boolean,
    hCloseModal: Function,
}) => {
    const { user: useDataSerever } = useAppData();
    const [form] = Form.useForm();
    const { setMessage } = useNoteStore();

    const { mutate, isPending } = useMutation({
        mutationFn: user.updatePassword,
        onSuccess: (data) => {
            if (data?.message) {
                return form.setFields([
                    {
                        name: "password",
                        errors: [data.message.join(', ')],
                    },
                ]);
            }

            handleCloseModal();
            setMessage('Пароль успішно змінено', 'success');
        },
        onError: (error: any) => {
            form.setFields([
                {
                    name: "password",
                    errors: ["Помилка при зміні паролю"],
                },
            ]);
        },
    });

    const handleCloseModal = () => {
        hCloseModal();
    }

    return (
        <Modal
            title="Змінити пароль"
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
                form={form}
                name="reset"
                layout="vertical"
                initialValues={{
                    password: "",
                }}
                className="c-f-modal-reset"
                onFinish={(data: { password: string }) => {
                    mutate({ userId: useDataSerever.id, password: data.password })
                }}
            >
                <Form.Item
                    label="Новий пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Поле обов'язкове"
                        }
                    ]}
                >
                    <Input placeholder="&2ksk23" />
                </Form.Item>

                <Form.Item className="c-wr-button-bot">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isPending}
                        block>Змінити</Button>
                </Form.Item>
            </Form>
        </Modal >
    )
}