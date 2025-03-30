import { Form, Input, Button, Modal } from 'antd';

export const ChangePasswordModal = ({
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
        >
            <Form
                name="reset"
                layout="vertical"
                initialValues={{
                    password: "",
                }}
                className="c-f-modal-reset"
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
                        loading={false}
                        block>Змінити</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}