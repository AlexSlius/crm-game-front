import { Form, Input, Button, Modal, Select } from 'antd';

import { useAppData } from '../../store/appData';
import { useGetCitiesNow } from '../../hooks/useGetCitiesNow';
import { useEffect } from 'react';

export const UserEditModal = ({
    isModalOpen = false,
    isLoadBtn = false,
    data = {},
    hCloseModal = () => { },
    mutateCreate = () => { },
    mutateUpdate = () => { },
}: {
    isModalOpen: boolean,
    hCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isLoadBtn: boolean;
    data: any;
    mutateCreate: any;
    mutateUpdate: any;
}) => {
    const { roles, statuses } = useAppData();
    const { fetchCities, citiesData, isLoadingCity } = useGetCitiesNow();

    const debouncedSearchCity = (text: any) => {
        fetchCities({ search: text });
    }

    const handleSubmit = (values: any) => {
        if (!data?.id) {
            mutateCreate(values);
        } else {
            const { password, ...other } = values;
            mutateUpdate({
                id: data.id,
                ...other,
                ...(!!password && {
                    password
                })
            });
        }
    };

    useEffect(() => {
        if (isModalOpen)
            fetchCities({});
    }, [isModalOpen]);

    return (
        <Modal
            title={!!data?.id ? 'Редагувати' : 'Новий користувач'}
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
                    label="Ім'я"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Поле обов'язкове"
                        }
                    ]}
                >
                    <Input placeholder="Василь" />
                </Form.Item>

                <Form.Item
                    label="Пошта"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Поле пошта обов'язкове!"
                        }, {
                            type: "email",
                            message: "Введіть коректну електронну пошту!",
                            validateTrigger: "onSubmit"
                        }
                    ]}
                >
                    <Input placeholder="email@gmail.com" />
                </Form.Item>

                <Form.Item
                    label="Місто"
                    name="cityId"
                >
                    <Select
                        mode="multiple"
                        showSearch
                        loading={isLoadingCity}
                        placeholder="Місто"
                        optionFilterProp="label"
                        filterOption={false}
                        onSearch={debouncedSearchCity}
                        options={citiesData?.data?.map((el: { id: number, name: string }) => ({ value: el.id, label: el.name }))}
                    />
                </Form.Item>

                <Form.Item
                    label="Роль"
                    name="roleId"
                    rules={[
                        {
                            required: true,
                            message: "Поле обов'язкове"
                        }
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Модератор"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={roles.map(el => ({ value: el.id, label: el.name }))}
                    />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: !!data?.id ? false : true,
                            message: "Поле пароль обов'язкове!"
                        }
                    ]}
                >
                    <Input.Password placeholder="Password" />
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
                        options={statuses?.map(el => ({ value: el.id, label: el.name })).filter(((el: { value: number }) => [1, 2, 4].includes(el.value)))}
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