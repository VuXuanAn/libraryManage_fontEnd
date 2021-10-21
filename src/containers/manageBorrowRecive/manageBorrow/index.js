import React, { useState } from 'react';
import Layout from '../../../components/Layout'
import './style.css'
import { Button, Input, Form, InputNumber, Modal, message, Collapse, Table, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createNewTicket, returnBook } from '../../../actions/ticketBorrowed.action';
import { ContainerOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
const Index = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTicket, setmodalTicket] = useState(false);
    const dispatch = useDispatch()

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
    const [ticketServe, setticketServe] = useState({});


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
                today,
                tomorrow
            }
            const bookServe = {
                idBook,
                idUser,
                quantity,
                today,
                tomorrow
            }
            setticketServe(bookServe)
            setticketBorrowed(ticketBorrowed)
            setIsModalVisible(true)
        }

    }
    const showModalTicket = () => {
        setmodalTicket(true)
    }
    const handleOk = () => {
        setIsModalVisible(false);
        dispatch(createNewTicket(ticketServe))
    };
    const handleOkTicket = async () => {
        await setmodalTicket(false);
        await setIsModalVisible(true);
    };
    const handleCancelTicket = () => {
        setmodalTicket(false);
    };


    const tickets = useSelector(state => state.tickets)

    const columns = [
        {
            title: 'Đọc giả',
            dataIndex: 'idUser',
            key: 'idUser',
            render: idUser => {
                return <p>{idUser.lastName + " " + idUser.firstName}</p>
            }
        },
        {
            title: 'Sách',
            dataIndex: 'idBook',
            key: 'idBook',
            render: idBook => {
                return <p>{idBook.name}</p>
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title: 'Tình trạng',
            dataIndex: 'isReturn',
            key: 'isReturn',
            render: (text, record) => {
                return record.isReturn === true ? <p>đã trả</p> :
                    <Popconfirm
                        title="Bạn chắc chắn muốn trả "
                        onConfirm={() => confirmReturn(record._id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary"  >Đang mượn</Button>
                    </Popconfirm>

            }
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
        }
    ];
    const confirmDelete = (id) => {
        alert(id)
    }
    const confirmReturn = (id) => {
        dispatch(returnBook(id))
    }
    const cancel = () => {

    }
    return (
        <Layout icon={<ContainerOutlined className='iconOfItem' />} title={'Mượn trả'}>
            <div >
                <Button type="primary" onClick={showModalTicket} >
                    tạo phiếu mượn
                </Button>

                <Modal
                    title="Tạo phiếu mượn"
                    visible={modalTicket}
                    width={400}
                    footer={false}
                    onOk={handleOkTicket}
                    onCancel={handleCancelTicket}
                >
                    <Form
                        className="formBorrowed"
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="idUser"
                            rules={[{ required: true, message: 'Vui lòng nhập id đọc giả' }]}
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
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                        >
                            <InputNumber min={1} max={50} placeholder="số lượng" style={{ width: '100%!important' }} />
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
                </Modal>



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
                <div style={{ marginTop: '50px' }}>
                    <p>Danh sách phiếu mượn</p>
                    {tickets.tickets ? <Table columns={columns} dataSource={tickets.tickets} style={{ width: '100%!important' }} /> : null}
                </div>
            </div>
        </Layout>
    );
}

export default Index;
