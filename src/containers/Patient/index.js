import React from 'react';
import Layout2 from '../../components/Layout2'
import {
    UserOutlined, BookOutlined, DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Popconfirm, Table } from 'antd';
import { useState } from 'react';
import { createNewProfile, deleteProfileById } from '../../actions/profile.medical';
import { useDispatch, useSelector } from 'react-redux';
const Index = () => {
    const dispatch = useDispatch()
    const [IsModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        const {
            soCMND,
            hoTen,
            ngaySinh,
            ngayVaoVien,
            ngayRaVien,
            baoHiem,
            tenBenh,
            vienPhi
        } = values
        const newProfile = {
            soCMND,
            hoTen,
            ngaySinh,
            ngayVaoVien,
            ngayRaVien,
            baoHiem,
            tenBenh,
            vienPhi
        }
        dispatch(createNewProfile(newProfile))
    }
    const confirmDelete = (_id) => {
        dispatch(deleteProfileById(_id))
    }

    const profiles = useSelector(state => state.profile)
    const columns = [
        {
            title: 'CMND',
            dataIndex: 'soCMND',
            key: 'soCMND',
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            key: 'hoTen',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'ngaySinh',
            key: 'ngaySinh',
        },
        {
            title: 'Ngày vào viện',
            key: 'ngayVaoVien',
            dataIndex: 'ngayVaoVien',
        },
        {
            title: 'Ngày ra viện',
            key: 'ngayRaVien',
            dataIndex: 'ngayRaVien',
        },
        {
            title: 'Tên bệnh',
            key: 'tenBenh',
            dataIndex: 'tenBenh',
        },
        {
            title: 'Viện phí',
            key: 'vienPhi',
            dataIndex: 'vienPhi',
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
                        okText="Yes"
                        cancelText="No"

                    >
                        <DeleteOutlined style={{ marginRight: '20px', color: 'red' }} />
                    </Popconfirm>
                    <EditOutlined style={{ color: 'green' }} />
                </div>
        }
    ];



    return (
        <Layout2 icon={<BookOutlined className='iconOfItem' />} title={'Hồ sơ viện phí'}>
            <Button type="primary" onClick={showModal} icon={<UserOutlined />} >
                Thêm Hồ Sơ
            </Button>
            <Modal
                title="Thêm mới hồ sơ bệnh nhân"
                visible={IsModalVisible}
                footer={false}
                width={800}
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
                        name="soCMND"
                        rules={[{ required: true, message: 'Vui lòng nhập số cmnd' }]}
                    >
                        <Input placeholder="số chứng minh nhân dân" />
                    </Form.Item>
                    <Form.Item
                        name="hoTen"
                        rules={[{ required: true, message: 'Họ tên' }]}
                    >
                        <Input placeholder="Họ và tên" />
                    </Form.Item>
                    <Form.Item
                        name="gioiTinh"
                        rules={[{ required: true, message: 'Vui lòng nhập ngày sinh' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        name="ngaySinh"
                        rules={[{ required: true, message: 'Vui lòng nhập ngày vào viện' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 24 }} >
                        <Button type="primary" htmlType="submit" style={{ marginRight: 'auto' }}>
                            Tạo sách mới
                        </Button>
                        <Button type="primary" style={{ float: 'right' }}>
                            Hủy
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <div className="listPublisingManage">
                <p>Danh sách nhà xuất bản</p>
                {profiles.profiles ? <Table columns={columns} dataSource={profiles.profiles} style={{ width: '100%!important' }} /> : null}

            </div>
        </Layout2>
    );
}

export default Index;
