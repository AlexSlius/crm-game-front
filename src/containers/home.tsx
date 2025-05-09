import { Col, Row, Card } from 'antd';
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import { useNumberOfQuestionStore } from '../store/number-of-question';

import { games } from '../api';
import CONSTANTS from "../constants/routers.json";

export const HomeContainer = () => {
    const { quntity } = useNumberOfQuestionStore();

    const params = new URLSearchParams();

    params.append('statuses', '1');
    params.append('statuses', '3');
    params.append('limit', '100');

    const {
        data,
    } = useQuery<any, Error>({
        queryKey: ['games'],
        queryFn: () => games.getGames(`?${params.toString()}`),
    });

    return (
        <Fragment>
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={12} lg={6}>
                    <Card
                        title={`Активних ігор`}
                        variant="borderless"
                        className='c-card-item'
                    >
                        <div className='wr-title-game-quant'>
                            {data?.data?.map((el: any) => el.statusId === 1).length}
                        </div>
                        <Link to={CONSTANTS.gamesActive}></Link>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                    <Card title={`Нових запитань`} variant="borderless" className='c-card-item'>
                        <div className='wr-title-game-quant'>{quntity}</div>
                        <Link to={CONSTANTS.question}></Link>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}