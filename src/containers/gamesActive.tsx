import { Flex, Typography, Button, Progress, Space, Row, Col, Card } from 'antd';
import { Fragment } from 'react/jsx-runtime';
import { EditOutlined, TeamOutlined, SearchOutlined, CloseOutlined, DownloadOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const GamsesActiveContainer = () => {
    return (
        <Fragment>
            <Flex justify='space-between' gap={14}>
                <Title level={4} className='c-norm-title'>Активні</Title>
                <Button type="primary" size='small'>+Додати</Button>
            </Flex>
            <Flex className='c-d-mt-24 c-bg-wh-p'>
                <Title level={5} className='c-norm-title'>Місто: Суми</Title>
            </Flex>
            <Row gutter={[24, 24]} className='c-d-mt-24'>
                {
                    [...new Array(3)].map((item, index) => (
                        <Col key={index} xs={24} sm={24} md={24} lg={12}>
                            <Card
                                title={`Життя`}
                                variant="borderless"
                                className='c-card-item'
                                extra={
                                    <Space>
                                        <Button
                                            color="cyan"
                                            variant="solid"
                                            icon={<TeamOutlined />}
                                            size='small'
                                            title="Команди"
                                        ></Button>
                                        <Button
                                            color="primary"
                                            variant="solid"
                                            icon={<EditOutlined />}
                                            size='small'
                                            title="Редагувати"
                                        ></Button>
                                    </Space>
                                }
                            >
                                <Flex gap={20} vertical>
                                    <Space direction="vertical" className='c-card-space'>
                                        <Flex className='c-c-flex-inf'>
                                            <div>Кількість місць: 15</div>
                                            <div>Зареєструвалось: 5</div>
                                            <div>Скасували: 2</div>
                                            <div>Заявок: 0</div>
                                            <div>Початок гри: 26.06.2024 12:06:56</div>
                                        </Flex>
                                        <Progress percent={30} />
                                    </Space>
                                </Flex>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            {/* <Flex className='c-d-mt-24 c-bg-wh-p'>
                <Title level={5} className='c-norm-title'>Місто: Львів</Title>
            </Flex>
            <Row gutter={[24, 24]} className='c-d-mt-24'>
                {
                    [...new Array(3)].map((item, index) => (
                        <Col key={index} xs={24} sm={24} md={24} lg={12}>
                            <Card
                                title={`Веселухи`}
                                variant="borderless"
                                className='c-card-item'
                                extra={
                                    <Space>
                                        <Button
                                            color="cyan"
                                            variant="outlined"
                                            icon={<TeamOutlined />}
                                            size='small'
                                            title="Команди"
                                        ></Button>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            icon={<EditOutlined />}
                                            size='small'
                                            title="Редагувати"
                                        ></Button>
                                    </Space>
                                }
                            >
                                <Flex gap={20} vertical>
                                    <Space direction="vertical" className='c-card-space'>
                                        <Title level={5} className='c-norm-title'>1. Рейтинова гра</Title>
                                        <Flex className='c-c-flex-inf'>
                                            <div>Кількість місць: 15</div>
                                            <div>Зареєструвалось: 5</div>
                                            <div>Скасували: 2</div>
                                            <div>Заявок: 0</div>
                                        </Flex>
                                        <Progress percent={30} />
                                    </Space>
                                </Flex>
                            </Card>
                        </Col>
                    ))
                }
            </Row> */}
        </Fragment>
    )
}