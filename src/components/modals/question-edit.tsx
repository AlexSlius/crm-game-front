import { Form, Input, Button, Modal, Select } from 'antd';
import { useEffect } from "react";

import { useAppData } from '../../store/appData';
import { useGetCitiesNow } from '../../hooks/useGetCitiesNow';

const { TextArea } = Input;

export const QuestionEditModal = ({
    isModalOpen = false,
    data = {},
    isLoadBtn = false,
    hCloseModal = () => { },
    mutateCreate = () => { },
    mutateUpdate = () => { },
}: {
    isModalOpen: boolean,
    hCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
    data: any;
    isLoadBtn: boolean;
    mutateCreate: any;
    mutateUpdate: any;
}) => {
    const [form] = Form.useForm();
    const { fetchCities, citiesData, isLoadingCity } = useGetCitiesNow();
    const { user, statuses } = useAppData();

    const userModer = user?.role?.id === 1;

    const debouncedSearchCity = (text: any) => {
        fetchCities({ search: text });
    }

    const handleSubmit = (values: any) => {
        if (!data?.id) {
            mutateCreate({ ...values, chatId: '-' });
        } else {
            mutateUpdate({
                id: data.id,
                ...values,
            });
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            form.setFieldsValue(data);
        }

        if (isModalOpen && user?.role?.id === 1) {
            fetchCities({});
            form.setFieldValue('cityId', user?.city[0]?.id);
        }
    }, [isModalOpen, form, user]);

    return (
        <Modal
            title={!!data?.id ? 'Редагувати' : 'Нове питання'}
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
                form={form}
                name="reset"
                layout="vertical"
                className="c-f-modal-reset"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Username в телеграм"
                    name="nickname"
                    rules={[
                        {
                            required: true,
                            message: "Поле обов'язкове"
                        },
                        {
                            pattern: /^@[\w\d_]{1,}$/,
                            message: "Username повинен починатися з @ та містити",
                        }
                    ]}
                >
                    <Input placeholder="@alex" />
                </Form.Item>

                <Form.Item
                    label="Автор Ім'я"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Поле обов'язкове"
                        }
                    ]}
                >
                    <Input placeholder="Давід" />
                </Form.Item>

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
                    <Input placeholder="+380..." />
                </Form.Item>

                <Form.Item
                    label="Назва команди"
                    name="team"
                    rules={[
                        {
                            required: true,
                            message: "Поле обов'язкове"
                        }
                    ]}
                >
                    <Input placeholder="Веселі" />
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
                    label="Запитання"
                    name="question"
                    rules={[
                        {
                            required: true,
                            message: "Поле обов'язкове"
                        }
                    ]}
                >
                    <TextArea
                        rows={2}
                        maxLength={2000}
                        showCount
                    />
                </Form.Item>

                <Form.Item
                    label="Відповідь"
                    name="answer"
                >
                    <TextArea
                        rows={2}
                        maxLength={1000}
                        showCount
                    />
                </Form.Item>

                <Form.Item
                    label="Активність"
                    name="statusId"
                >
                    <Select
                        showSearch
                        placeholder="Активний"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={statuses?.map(el => ({ value: el.id, label: el.name })).filter(((el: { value: number }) => [8, 9].includes(el.value)))}
                    />
                </Form.Item>

                <Form.Item className="c-wr-button-bot">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoadBtn}
                        block>{!!data?.id ? 'Зберегти' : 'Додати'} </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}