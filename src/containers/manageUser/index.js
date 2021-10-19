import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Input, Popconfirm, Form, Table } from 'antd';
import Layout from './../../components/Layout'
import {
    UserAddOutlined,
    UserOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
import { addUser } from '../../actions/user.action';
const Index = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch()
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (value) => {
        const { firstName, lastName, email, password } = value;
        const user = {
            firstName, lastName, email, password
        }
        dispatch(addUser(user))
    }

    const users = useSelector(state => state.user)
    const columns = [
        {
            title: 'Họ',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Tên',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Action',
            key: '_id',
            dataIndex: '_id',
            render: _id =>
                <div>
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => confirmDelete(_id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"

                    >
                        <DeleteOutlined style={{ marginRight: '20px', color: 'red' }} />
                    </Popconfirm>
                    <EditOutlined style={{ color: 'green' }} />
                </div>
        }
    ];

    const confirmDelete = (_id) => {

    }

    function cancel(e) {
        console.log(e);
    }

    return (
        <Layout icon={<UserOutlined className='iconOfItem' />} title={'Đọc giả'}>
            <div>
                <div>
                    <Button type="primary" onClick={showModal} icon={<UserAddOutlined />} >
                        Thêm đọc giả
                    </Button>

                    <Modal
                        title="Thêm độc giả"
                        visible={isModalVisible}
                        footer={false}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >

                        <Form
                            name="basic"
                            wrapperCol={{ span: 24 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="firstName"
                                rules={[{ required: true, message: 'Vui lòng nhập tên sách' }]}
                            >
                                <Input placeholder="Họ" />
                            </Form.Item>


                            <Form.Item
                                name="lastName"
                                rules={[{ required: true, message: 'Vui lòng nhập giá sách' }]}
                            >
                                <Input placeholder="Tên" />
                            </Form.Item>


                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                            >
                                <Input placeholder="email" />
                            </Form.Item>


                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                            >
                                <Input placeholder="mật khẩu" />
                            </Form.Item>




                            <Form.Item wrapperCol={{ span: 24 }} >
                                <Button type="primary" htmlType="submit" style={{ marginRight: 'auto' }}>
                                    Thêm đôc giả
                                </Button>
                                <Button type="primary" style={{ float: 'right' }}>
                                    Hủy
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>

                </div>
                <div className="listPublisingManage">
                    <p>Danh sách độc giả</p>
                    {users.users ? <Table columns={columns} dataSource={users.users} style={{ width: '100%!important' }} /> : null}

                </div>
            </div>
        </Layout>
    );
}

export default Index;
