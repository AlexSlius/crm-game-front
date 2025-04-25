import { Form, Input, Button, InputNumber, Modal, Select, Row, Col, Flex, Radio, DatePicker } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import { useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import type { UploadFile } from 'antd/es/upload/interface';

import { useAppData } from '../../store/appData';
import { useNoteStore } from '../../store/note';
import { useGetCitiesNow } from '../../hooks/useGetCitiesNow';
import { games } from "../../api";
import { ImageUploadFormItem } from '../upload-image';

const { TextArea } = Input;

export const GameEditModal = ({
    isModalOpen = false,
    data = {},
    refetchReload = () => { },
    hCloseModal = () => { },
}: {
    isModalOpen: boolean,
    hCloseModal: () => void;
    data: any;
    refetchReload: any;
}) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const isPlaces = useWatch('isPlaces', form);
    const { statuses } = useAppData();
    const { setMessage } = useNoteStore();
    const { fetchCities, citiesData, isLoadingCity } = useGetCitiesNow();
    const { user } = useAppData();

    const userModer = user?.role?.id === 1;

    const debouncedSearchCity = (text: any) => {
        fetchCities({ search: text });
    }

    const {
        mutate: mutateCreate,
        isPending: isLoadingCreate
    } = useMutation({
        mutationFn: games.create,
        onSuccess: (data) => {
            if (data?.message) {
                return setMessage(data?.message.join(", "));
            }

            hCloseModal();
            refetchReload();
            setMessage('Гра успішно додана', 'success');
        },
    });

    const {
        mutate: mutateUpdate,
        isPending: isLoadingUpdate
    } = useMutation({
        mutationFn: games.update,
        onSuccess: (data) => {
            if (data?.message) {
                return setMessage(data?.message.join(", "));
            }

            hCloseModal();
            refetchReload();
            setMessage('Гра успішно оновлена', 'success');
        },
    });

    const handleSubmit = (values: any) => {
        const { day, time, places, ...rest } = values;

        const date = dayjs(day);
        const timeOfDay = dayjs(time);

        const combinedDateTime = date
            .hour(timeOfDay.hour())
            .minute(timeOfDay.minute())
            .second(0)
            .millisecond(0);

        const payload = {
            ...rest,
            places: places ? Number(places) : null,
            beginningDateTime: combinedDateTime.toISOString(),
        };

        if (data?.id) {
            if (payload.image.includes('uploads/')) {
                delete payload.image;
            }

            mutateUpdate({ id: data.id, ...payload })
        } else {
            mutateCreate(payload);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            form.setFieldsValue(data);

            if (data?.id) {
                setFileList([
                    {
                        uid: data.image,
                        name: '',
                        url: data.image,
                    },
                ]);
            }
        } else {
            form.resetFields();
            setFileList([]);
        }
    }, [isModalOpen, data])

    useEffect(() => {
        if (isModalOpen && user?.role?.id === 1) {
            fetchCities({});
        }

    }, [isModalOpen, user]);

    useEffect(() => {
        if (user?.role?.id !== 1) {
            form.setFieldValue('cityId', user?.city[0]?.id);
        }
    }, [user]);

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
                name="game"
                layout="vertical"
                className="c-f-modal-reset"
                onFinish={handleSubmit}
            >
                <Row gutter={[20, 0]}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <ImageUploadFormItem fileList={fileList} setFileList={setFileList} dataForm={form} />
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
                            name="cityId"
                            rules={[
                                {
                                    required: true,
                                    message: "Поле обов'язкове"
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                loading={isLoadingCity}
                                placeholder="Місто"
                                optionFilterProp="label"
                                filterOption={false}
                                onSearch={userModer ? debouncedSearchCity : () => { }}
                                options={(userModer ? citiesData?.data : user?.city)?.map((el: { id: number, name: string }) => ({ value: el.id, label: el.name }))}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Додати кількість місць ?"
                            name="isPlaces"
                        >
                            <Radio.Group
                                block
                                options={[
                                    {
                                        label: 'Так',
                                        value: true
                                    },
                                    {
                                        label: 'Ні',
                                        value: false
                                    }
                                ]}
                                optionType="button"
                            />
                        </Form.Item>

                        {
                            isPlaces && (
                                <Form.Item
                                    label="Місць"
                                    name="places"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Поле обов'язкове"
                                        },
                                        {
                                            type: 'number',
                                            min: 1,
                                            max: 100,
                                            message: 'Кількість місць має бути від 1 до 100',
                                            transform: (value) => Number(value),
                                        },
                                    ]}
                                >
                                    <InputNumber placeholder="10" max={100} min={1} style={{ width: '100%' }} />
                                </Form.Item>
                            )
                        }

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
                            <DatePicker
                                style={{ width: "100%" }}
                                placeholder="Оберіть дату"
                                format="DD.MM.YYYY"
                                disabledDate={(current) => current && current < dayjs().startOf('day')}
                            />
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
                            <DatePicker
                                style={{ width: "100%" }}
                                picker="time"
                                placeholder="Оберіть час"
                                format="HH:mm"
                                minuteStep={10}
                            />
                        </Form.Item>

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
                                options={statuses?.map(el => ({ value: el.id, label: el.name })).filter(((el: { value: number }) => [1, 3, 5, 7].includes(el.value)))}
                            />
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
                            <TextArea
                                rows={10}
                                maxLength={3600}
                                showCount
                            />
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