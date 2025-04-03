import { Form, Input, Button, Modal, Select, Radio, Row, Col, Flex, Image, Upload, DatePicker } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export const GameEditModal = ({
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

    const handleChange: UploadProps['onChange'] = (info) => {

    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {false ? <LoadingOutlined /> : <PlusOutlined />}
        </button>
    );

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
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            label="Картинка"
                            name="picture"
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="picture-uploader"
                                style={{ width: '100%' }}
                                showUploadList={false}
                            // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            // beforeUpload={beforeUpload}
                            // onChange={handleChange}
                            >
                                {false ? <img src={'/logo192.png'} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            label="Назва"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Поле обов'язкове"
                                }
                            ]}
                        >
                            <Input placeholder="Гра" />
                        </Form.Item>

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

                        <Form.Item
                            label="Місць"
                            name="places"
                        >
                            <Input type='number' placeholder="10" maxLength={3} />
                        </Form.Item>

                        <Form.Item
                            label="Початок гри. день"
                            name="day"
                            rules={[
                                {
                                    required: true,
                                    message: "Поле обов'язкове"
                                }
                            ]}
                        >
                            <DatePicker style={{ width: "100%" }} placeholder="Оберіть дату" format="DD.MM.YYYY" />
                        </Form.Item>

                        <Form.Item
                            label="Початок гри. час"
                            name="time"
                            rules={[
                                {
                                    required: true,
                                    message: "Поле обов'язкове"
                                }
                            ]}
                        >
                            <DatePicker style={{ width: "100%" }} picker="time" placeholder="Оберіть час" format="HH:mm" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[20, 0]}>
                    <Col xs={24} xxl={24}>
                        <Form.Item
                            label="Опис"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Поле обов'язкове"
                                }
                            ]}
                        >
                            <TextArea rows={10} />
                        </Form.Item>
                    </Col>
                </Row>

                <Flex justify='center'>
                    <Form.Item className="c-wr-button-bot">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={false}
                            style={{ width: '240px' }}
                        >{!!data?.id ? 'Зберегти' : 'Додати'} </Button>
                    </Form.Item>
                </Flex>
            </Form>
        </Modal>
    )
}