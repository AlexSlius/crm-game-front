import { Col, Row, Card } from 'antd';
import { Fragment } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';

import {
    games,
    questions,
} from '../api';

export const HomeContainer = () => {
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

    const {
        data: dataQuestion,
    } = useQuery<any, Error>({
        queryKey: ['questionTotal'],
        queryFn: () => questions.tatalActive(),
});

return (
    <Fragment>
        <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={12} lg={6}>
                <Card title={`Активних ігор`} variant="borderless" className='c-card-item'>
                    <div className='wr-title-game-quant'>
                        {data?.data?.map((el: any) => el.statusId === 1).length}
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
                <Card title={`Нових запитань`} variant="borderless" className='c-card-item'>
                    <div className='wr-title-game-quant'>{dataQuestion?.data?.total || 0}</div>
                </Card>
            </Col>
        </Row>
    </Fragment>
)
}