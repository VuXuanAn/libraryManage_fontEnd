import React, { useEffect, useState } from 'react';
import './style.css'
import { Modal, Button, Input, Popconfirm, Form, } from 'antd';
import {
    UserAddOutlined
} from '@ant-design/icons';
import Layout from '../../../components/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { addProduct, deleteNxb } from '../../../actions/nxb.action';


const NXB = () => {
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
    const nxb = useSelector(state => state.nxb)


    const columns = [
        {
            title: 'Tên nhà xuất bản',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Xóa',
            key: '_id',
            dataIndex: '_id',
            render: _id =>
                <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={() => confirmDelete(_id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <a href="#">Delete</a>
                </Popconfirm>,
        },
        {
            title: 'Sửa',
            key: '_id',
            dataIndex: '_id',
            render: _id =>
                <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={() => confirmDelete(_id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <a href="#">Edit</a>
                </Popconfirm>,
        },
    ];


    const confirmDelete = (_id) => {
        dispatch(deleteNxb(_id))
    }

    function cancel(e) {
        console.log(e);
    }

    const onFinish = (value) => {
        const nxb = {
            name: value.name,
            address: value.address,
            phoneNumber: value.phoneNumber,
            email: value.email
        }
        dispatch(addProduct(nxb))
    }
    // const auth = useSelector(state => state.auth)
    // // useEffect(() => {
    // //     dispatch(getInitialData());
    // // }, [auth.authenticate]);

    return (
        <Layout>
            <div style={{ padding: '50px', width: '100%' }}>
                <div>
                    <Button type="primary" onClick={showModal} icon={<UserAddOutlined />} >
                        Thêm nhà xuất bản
                    </Button>
                    <Modal
                        title="Thêm nhà xuất bản"
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
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập tên nhà xuất bản' }]}
                            >
                                <Input placeholder="Tên nhà xuất bản" />
                            </Form.Item>
                            <Form.Item
                                name="address"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                            >
                                <Input placeholder="Địa chỉ" />
                            </Form.Item>
                            <Form.Item
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                            >
                                <Input placeholder="Số điện thoại" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 24 }} >
                                <Button type="primary" htmlType="submit" style={{ marginRight: 'auto' }}>
                                    Thêm nhà xuất bản
                                </Button>
                                <Button type="primary" style={{ float: 'right' }}>
                                    Hủy
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <div className="listPublisingManage">
                    <p>Danh sách nhà xuất bản</p>
                    {nxb.nxb ? <Table columns={columns} dataSource={nxb.nxb} style={{ width: '100%!important' }} /> : null}

                </div>
            </div>
        </Layout>
    );
}

export default NXB;
