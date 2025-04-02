import { Form, Input, Button, Modal, Select, Radio } from 'antd';

export const UserEditModal = ({
    isModalOpen = false,
    data = {},
    hCloseModal = () => { },
    setDataModal = () => { },
}: {
    isModalOpen: boolean,
    hCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
    setDataModal: Function,
    data: any;
}) => {
    const handleSubmit = (values: any) => {
        console.log("Отримані дані з форми:", values);
    };

    return (
        <Modal
            title={!!data?.id ? 'Редагувати' : 'Новий користувач'}
            open={isModalOpen}
            onCancel={hCloseModal}
            width={{
                xs: '90%',
                sm: '500px',
                md: '500px',
                lg: '500px',
                xl: '500px',
                xxl: '500px',
            }}
            footer={null}
            destroyOnClose
        >
            <Form
                name="reset"
                layout="vertical"
                initialValues={data}
                className="c-f-modal-reset"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Ім'я"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Поле обов'язкове"
                        }
                    ]}
                >
                    <Input placeholder="Василь" />
                </Form.Item>

                <Form.Item
                    label="Пошта"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Поле пошта обов'язкове!"
                        }, {
                            type: "email",
                            message: "Введіть коректну електронну пошту!",
                            validateTrigger: "onSubmit"
                        }
                    ]}
                >
                    <Input placeholder="email@gmail.com" />
                </Form.Item>

                <Form.Item
                    label="Роль"
                    name="role"
                    rules={[
                        {
                            required: true,
                            message: "Поле обов'язкове"
                        }
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Модератор"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[
                            {
                                value: 1,
                                label: `Організатор`,
                            },
                            {
                                value: 2,
                                label: `Модератор`,
                            }
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: !!data?.id ? false : true,
                            message: "Поле пароль обов'язкове!"
                        }
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                    label="Активність"
                    name="active"
                >
                    <Radio.Group
                        options={[
                            { value: false, label: "Ні" },
                            { value: true, label: "Так" },
                        ]}
                    />
                </Form.Item>

                <Form.Item className="c-wr-button-bot">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={false}
                        block>{!!data?.id ? 'Зберегти' : 'Додати'} </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}