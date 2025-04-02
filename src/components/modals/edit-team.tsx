import { Form, Input, Button, Modal, Select, Radio, Row, Col, Flex } from 'antd';

const { TextArea } = Input;

export const TeamEditModal = ({
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
            title={!!data?.id ? 'Редагувати' : 'Нова команда'}
            open={isModalOpen}
            onCancel={hCloseModal}
            width={{
                xs: '90%',
                sm: '500px',
                md: '600px',
                lg: '800px',
                xl: '1000px',
                xxl: '1000px',
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
                <Row gutter={[20, 0]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            label="Назва команди"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Поле обов'язкове"
                                }
                            ]}
                        >
                            <Input placeholder="Круті" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            label="Капітан"
                            name="captain"
                            rules={[
                                {
                                    required: true,
                                    message: "Поле обов'язкове"
                                }
                            ]}
                        >
                            <Input placeholder="Ім'я капітана" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[20, 0]}>
                    <Col xs={24}  xxl={24}>
                        <Form.Item
                            label="Телефон"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Поле обов'язкове"
                                }
                            ]}
                        >
                            <Input placeholder="+3806612547.." />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[20, 0]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            label="Гра"
                            name="game"
                            rules={[
                                {
                                    required: true,
                                    message: "Поле обов'язкове"
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Нова"
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
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            label="Місто"
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: "Поле обов'язкове"
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Львів"
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
                    </Col>
                </Row>

                <Row gutter={[20, 0]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            label="Гравців"
                            name="players"
                            rules={[
                                {
                                    required: true,
                                    message: "Поле обов'язкове"
                                }
                            ]}
                        >
                            <Input placeholder="10" maxLength={3} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            label="Гравців (нова)"
                            name="playersNew"
                        >
                            <Input placeholder="10" maxLength={3} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[20, 0]}>
                    <Col xs={24} xxl={24}>
                        <Form.Item
                            label="Статус"
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: "Поле обов'язкове"
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Активний"
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
                    </Col>
                </Row>

                <Row gutter={[20, 0]}>
                    <Col xs={24} xxl={24}>
                        <Form.Item
                            label="Побажання"
                            name="wish"
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[20, 0]}>
                    <Col xs={24} xxl={24}>
                        <Form.Item
                            label="Примітка"
                            name="note"
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>


                <Flex justify='center'>
                <Form.Item className="c-wr-button-bot">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={false}
                        style={{width: '240px'}}
                    >{!!data?.id ? 'Зберегти' : 'Додати'} </Button>
                </Form.Item>
                </Flex>
            </Form>
        </Modal>
    )
}