import { useState } from 'react';
import { Form, Input, Button, Typography, Flex } from "antd";
import { Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";

import { ResetPassword } from "../components/modals/reset-password";
import { useAuthStore } from '../store/auth';

import CONSTANTS from "../constants/routers.json";

const { Title } = Typography;


export const AutorizationContainer = () => {
    const [openReset, setOpenReset] = useState<boolean>(false);

    const { login } = useAuthStore();
    const navigate = useNavigate();

    const closeModalReset = () => {
        setOpenReset(false);
    }

    const handleFinish = () => {
        login();
        navigate(CONSTANTS.home);
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

                        <Flex justify="end">
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
                                loading={false}
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