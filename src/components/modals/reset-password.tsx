import { Form, Input, Button, Modal } from 'antd';

export const ResetPassword = ({
    isModalOpen = false,
    hCloseModal = () => { },
}: {
    isModalOpen: boolean,
    hCloseModal: Function,
}) => {
    const handleCloseModal = () => {
        hCloseModal();
    }

    return (
        <Modal
            title="Нагадати пароль"
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
        >
            <Form
                name="reset"
                layout="vertical"
                initialValues={{
                    email: "",
                }}
                className="c-f-modal-reset"
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
                        loading={false}
                        block>Отримати пароль</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}