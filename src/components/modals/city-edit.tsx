import { Form, Input, Button, Modal, Select } from 'antd';
import { useMutation } from '@tanstack/react-query';

import { useAppData } from '../../store/appData';
import {
    timeZona
} from "../../api";
import { useEffect } from 'react';

export const CityEditModal = ({
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
    const { statuses } = useAppData();

    const { mutate: fetchTimeZona, data: citiesZona, isPending } = useMutation({
        mutationFn: (search: string) => timeZona.getTimeZones({ search }),
    });

    const handleSubmit = (values: any) => {
        if (!data?.id) {
            mutateCreate(values);
        } else {
            mutateUpdate({
                id: data.id,
                ...values
            });
        }
    };
    useEffect(() => {
        if (isModalOpen) {
            fetchTimeZona('Europe/Kiev');
        }
    }, [isModalOpen]);

    return (
        <Modal
            title={!!data?.id ? 'Редагувати' : 'Нове місто'}
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
                    label="Місто"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Поле обов'язкове"
                        }
                    ]}
                >
                    <Input placeholder="Київ" />
                </Form.Item>

                <Form.Item
                    label="Часовий пояс (пошук по назві)"
                    name="timeZoneId"
                    rules={[
                        {
                            required: true,
                            message: "Поле обов'язкове"
                        }
                    ]}
                >
                    <Select
                        showSearch
                        loading={isPending}
                        placeholder="Часовий пояс"
                        optionFilterProp="label"
                        filterOption={false}
                        onSearch={fetchTimeZona}
                        options={(!data?.id ? citiesZona : (citiesZona?.length ? citiesZona : [data?.timeZone]))?.map((el: { id: number, name: string }) => ({ value: el.id, label: el.name }))}
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