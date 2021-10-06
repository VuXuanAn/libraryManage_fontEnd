import React, { useState } from 'react';
import Layout from '../../../components/Layout'
import './style.css'
import { Button, Input, Form, InputNumber, Modal, Descriptions, message } from 'antd';
import { useSelector } from 'react-redux';
const Index = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const user = useSelector(state => state.user)
    const book = useSelector(state => state.book)

    const renderNameById = (id) => {
        for (var i = 0; i < user.users.length; i++) {
            if (user.users[i]._id === id) {
                return user.users[i]
            }
            return 0;
        }
    }

    const renderBookById = (id) => {
        for (var i = 0; i < book.book.length; i++) {
            if (book.book[i]._id === id) {
                return book.book[i]
            }
            return 0
        }
    }
    const [ticketBorrowed, setticketBorrowed] = useState({});
    const onFinish = async (value) => {
        const { idBook, idUser, quantity, saleCode } = value;
        const user2 = await renderNameById(idUser)

        const book = await renderBookById(idBook).name;
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 14);
        if (book === undefined) {
            return message.info('Không tồn tại sách này');
        }
        if (!user2) {
            return message.info('Người dùng không tồn tại ');
        }

        else {
            const user = user2.firstName + " " + user2.lastName;
            const ticketBorrowed = {
                book,
                user,
                quantity,
                saleCode,
                today,
                tomorrow
            }
            setticketBorrowed(ticketBorrowed)
            setIsModalVisible(true)
        }

    }
    return (
        <Layout>
            <Form
                className="formBorrowed"
                name="basic"
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="idUser"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sách' }]}
                >
                    <Input placeholder="ID người muợn" />
                </Form.Item>
                <Form.Item
                    name="idBook"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sách' }]}
                >
                    <Input placeholder="ID sách" />
                </Form.Item>
                <Form.Item
                    name="quantity"
                    rules={[{ required: true, message: 'Vui lòng nhập giá sách' }]}
                >
                    <InputNumber min={1} max={50} placeholder="giá" style={{ width: '100 %' }} />
                </Form.Item>
                <Form.Item
                    name="saleCode"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sách' }]}
                >
                    <Input placeholder="mã mượn không thời hạn" />
                </Form.Item>
                <i>thời gian mượn 14 ngày tính từ ngày mượn, sau 14 ngày tính phí 5000Đ/ngày trả trễ</i>
                <Form.Item wrapperCol={{ span: 24 }} >
                    <Button type="primary" htmlType="submit" style={{ marginRight: 'auto' }}>
                        mượn
                    </Button>
                    <Button type="primary" style={{ float: 'right' }}>
                        reset
                    </Button>
                </Form.Item>

            </Form>

            <Modal
                title="Thông tin phiếu mượn"
                visible={isModalVisible}
                width={400}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {JSON.stringify(ticketBorrowed) === '{}' ? null :
                    <div>
                        <p>Nguời mượn: {ticketBorrowed.user}  </p>
                        <p>Tên sách: {ticketBorrowed.book} </p>
                        <p>Số lượng: {ticketBorrowed.quantity}</p>
                        <p>Mã code: {ticketBorrowed.saleCode}</p>
                        <p>Ngày mượn: {ticketBorrowed.today.getDate() + "-" + ticketBorrowed.today.getMonth() + "-" + ticketBorrowed.today.getFullYear()} </p>
                        <p>Ngày trả: {ticketBorrowed.tomorrow.getDate() + "-" + ticketBorrowed.tomorrow.getMonth() + "-" + ticketBorrowed.tomorrow.getFullYear()}  </p>

                    </div>}

            </Modal>

        </Layout>
    );
}

export default Index;
