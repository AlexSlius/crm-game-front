import { Form, Input, Button, Modal, Select, Radio } from 'antd';

export const CityEditModal = ({
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
            title={!!data?.id ? 'Редагувати' : 'Нове місто'}
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
                    label="Місто"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Поле обов'язкове"
                        }
                    ]}
                >
                    <Input placeholder="Київ" />
                </Form.Item>

                <Form.Item
                    label="Часовий пояс"
                    name="timeZona"
                    rules={[
                        {
                            required: true,
                            message: "Поле обов'язкове"
                        }
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="UTC-0"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[...new Array(30)].map((_, index) => (
                            {
                                value: index,
                                label: `UTC-${index}`,
                            }
                        ))}
                    />
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