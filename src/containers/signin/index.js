import React from 'react';
import './style.css'
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/user.action';
import { Redirect } from 'react-router';
const SignIn = () => {
    const dispatch = useDispatch()
    const onFinish = (value) => {
        const user = {
            email: value.username,
            password: value.password
        }
        console.log({ user });
        dispatch(login(user))
    };

    const onFinishFailed = () => {
        console.log('Failed:');
    };
    const auth = useSelector(state => state.auth);

    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }

    return (
        <div className="bg">
            <div className="signIn">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 12 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 12 }} >
                        <Button type="primary" htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default SignIn;
