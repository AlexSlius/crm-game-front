import { useState } from 'react';
import { Form, Input, Button, Typography, Flex } from "antd";
import { Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';

import { ResetPassword } from "../components/modals/reset-password";
import { auth } from "../api";

import CONSTANTS from "../constants/routers.json";
import { useNoteStore } from '../store/note';

const { Title } = Typography;


export const AutorizationContainer = () => {
    const [openReset, setOpenReset] = useState<boolean>(false);
    const { setMessage } = useNoteStore();

    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: auth.login,
        onSuccess: (data) => {

            if (data?.message) {
                return setMessage(data.message.join(', '));
            }

            if (data?.token) {
                localStorage.setItem('token', data.token);
                navigate(CONSTANTS.home);
            }
        },
    });

    const closeModalReset = () => {
        setOpenReset(false);
    }

    const handleFinish = async (data: { email: string, password: string }) => {
        mutate(data);
    }

    return (
        <Fragment>
            <Flex align="center" justify="center" className="c-auth-min-h-p">
                <div className="c-auth-form-login">
                    <Title level={2} className="c-t-c">Авторизація</Title>
                    <Form
                        name="login"
                        layout="vertical"
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        onFinish={handleFinish}
                    >
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
                            label="Пароль"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Поле пароль обов'язкове!"
                                }
                            ]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <Flex align="end" vertical={true}>
                            <Button
                                size="small"
                                color="primary"
                                variant="link"
                                onClick={() => setOpenReset(true)}
                            >Забули пароль</Button>
                        </Flex>

                        <Form.Item className="c-wr-button-bot">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isPending}
                                block>Увійти</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Flex>

            <ResetPassword
                hCloseModal={closeModalReset}
                isModalOpen={openReset}
            />
        </Fragment>
    )
}