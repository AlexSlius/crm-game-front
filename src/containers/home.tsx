import { Col, Row, Card, Flex, Progress, Space, Typography } from 'antd';
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";

import CONSTANTS from "../constants/routers.json";

const { Title } = Typography;

export const HomeContainer = () => {
    return (
        <Fragment>
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <Card title={`Активних ігор: 2`} variant="borderless" className='c-card-item'>
                        <Flex gap={20} vertical>
                            <Space direction="vertical" className='c-card-space'>
                                <Link to={CONSTANTS.gamesActive}>
                                    <Title level={5} className='c-norm-title'>1. Рейтинова гра</Title>
                                </Link>
                                <Flex className='c-c-flex-inf'>
                                    <div>Кількість місць: 15</div>
                                    <div>Зареєструвалось: 5</div>
                                    <div>Скасували: 2</div>
                                    <div>Заявок: 0</div>
                                    <div>Місто: Суми</div>
                                </Flex>
                                <Progress percent={30} />
                            </Space>
                            <Space direction="vertical" className='c-card-space'>
                                <Link to={CONSTANTS.gamesActive}>
                                    <Title level={5} className='c-norm-title'>2. Рейтинова гра</Title>
                                </Link>
                                <Flex className='c-c-flex-inf'>
                                    <div>Кількість місць: 15</div>
                                    <div>Зареєструвалось: 5</div>
                                    <div>Скасували: 2</div>
                                    <div>Заявок: 0</div>
                                    <div>Місто: Львів</div>
                                </Flex>
                                <Progress percent={30} />
                            </Space>
                        </Flex>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}