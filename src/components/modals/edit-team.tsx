import { Form, Input, Button, Modal, Select, Row, Col, Flex, InputNumber } from 'antd';
import { useEffect } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';

import { useAppData } from '../../store/appData';
import { useNoteStore } from '../../store/note';
import { games, teams } from "../../api";

const { TextArea } = Input;

export const TeamEditModal = ({
    isModalOpen = false,
    data = {},
    hCloseModal = () => { },
    refetchReload = () => { },
}: {
    isModalOpen: boolean,
    hCloseModal: () => void;
    refetchReload?: () => void;
    data: any;
}) => {
    const [form] = Form.useForm();
    const { setMessage } = useNoteStore();
    const { statuses } = useAppData();

    const params = new URLSearchParams();

    params.append('statuses', '1');
    params.append('statuses', '3');
    params.append('limit', '100');

    const {
        isLoading,
        refetch,
        data: dataGame,
    } = useQuery<any, Error>({
        queryKey: ['games-modal-active'],
        queryFn: () => games.getGames(`?${params.toString()}`),
        enabled: false,
    });

    const {
        mutate: mutateCreate,
        isPending: isLoadingCreate
    } = useMutation({
        mutationFn: teams.create,
        onSuccess: (data) => {
            if (data?.message) {
                return setMessage(data?.message.join(", "));
            }

            hCloseModal();
            refetchReload();
            setMessage('Команда успішно додана', 'success');
        },
    });

    const {
        mutate: mutateUpdate,
        isPending: isLoadingUpdate
    } = useMutation({
        mutationFn: teams.update,
        onSuccess: (data) => {
            if (data?.message) {
                return setMessage(data?.message.join(", "));
            }

            hCloseModal();
            refetchReload();
            setMessage('Команда успішно оновлена', 'success');
        },
    });

    const gamesList = data?.id
        ? [...(dataGame?.data?.filter((el: any) => el.id !== data?.gameId) || []), data.game]
        : (dataGame?.data || []);

    const handleSubmit = (values: any) => {
        const { players = 0, playersNew = 0 } = values;

        if (data?.id) {
            mutateUpdate({
                ...values,
                players: +players,
                playersNew: +playersNew,
                id: data?.id
            });
        } else {
            mutateCreate({
                ...values,
                chatId: '-',
                nickname: "-",
                players: +players,
                playersNew: +playersNew,
                wish: values.wish || '-',
                note: values.note || '-',
                cityId: gamesList.find((el: any) => el.id === values.gameId).city.id
            });
        }
    };

    useEffect(() => {
        if (isModalOpen && data?.id) {
            form.setFieldsValue(data);
        }
    }, [isModalOpen, data, form])

    useEffect(() => {
        if (isModalOpen) {
            refetch();
        } else {
            form.resetFields();
        }
    }, [isModalOpen]);

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
                form={form}
                name="team"
                layout="vertical"
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
                    <Col xs={24} xxl={24}>
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
                            name="gameId"
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
                                loading={isLoading}
                                filterSort={(optionA, optionB) =>
                                    String(optionA?.label).toLowerCase().localeCompare(String(optionB?.label).toLowerCase())
                                }
                                options={gamesList?.map((el: { id: number, name: string }) => ({ label: el.name, value: el.id }))}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            label="Активність"
                            name="statusId"
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
                                options={statuses?.map(el => ({ value: el.id, label: el.name })).filter(((el: { value: number }) => [1, 4, 5, 6].includes(el.value)))}
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
                                },
                                {
                                    type: 'number',
                                    min: 4,
                                    max: 10,
                                    message: 'Кількість гравців має бути від 4 до 10',
                                    transform: (value) => Number(value),
                                },
                            ]}
                        >
                            <InputNumber disabled={data?.id} placeholder="10" max={10} min={4} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            label="Гравців (нова)"
                            name="playersNew"
                            rules={[
                                {
                                    type: 'number',
                                    transform: (value) => (value ? Number(value) : undefined),
                                    validator: (_, value) => {
                                        if (value === undefined || value === null || value === '') {
                                            return Promise.resolve();
                                        }
                                        if (value < 4 || value > 10) {
                                            return Promise.reject(new Error('Кількість гравців має бути від 4 до 10'));
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <InputNumber placeholder="8" max={10} min={4} />
                        </Form.Item>
                    </Col>
                </Row>
                {
                    data?.id && (
                        <Row gutter={[20, 0]}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item
                                    label="Місто"
                                    name="city"
                                >
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                        </Row>
                    )
                }

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
                            loading={isLoadingCreate || isLoadingUpdate}
                            style={{ width: '240px' }}
                        >{!!data?.id ? 'Зберегти' : 'Додати'} </Button>
                    </Form.Item>
                </Flex>
            </Form>
        </Modal>
    )
}