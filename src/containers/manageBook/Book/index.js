import React, { useState } from 'react';
import Layout from './../../../components/Layout'
import { Modal, Button, Input, Popconfirm, Form, Select, InputNumber, Upload, message } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import ImgCrop from 'antd-img-crop';
import { Table } from 'antd';
import { createBook, deleteBook } from '../../../actions/book.action';
import './style.css'
import { generatePublicUrl } from '../../../urlConfig';
const { Option } = Select;
const { TextArea } = Input;
const Index = () => {
    const [detailBookStatus, setdetailBookStatus] = useState(false);
    const [bookImage, setbookImage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch()
    const showModal = () => {
        setIsModalVisible(true);
    };

    const books = useSelector(state => state.book)
    const categories = useSelector(state => state.categories)
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const nxb = useSelector(state => state.nxb)
    const listNxb = []
    for (let category of nxb.nxb) {
        listNxb.push({ value: category._id, name: category.name });
    }
    const listCategory = []

    for (let category of categories.categories) {
        listCategory.push({
            value: category._id,
            name: category.name
        })
    }


    const columns = [
        {
            title: 'Tên sách',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Nhà xuất bản',
            dataIndex: 'nxb',
            key: 'nxb',
            render: nxb => {
                return <p>{nxb.name}</p>
            }
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            key: 'category',
            render: category => {
                return <p>{category.name}</p>
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
        },
        {
            title: 'Sửa',
            key: ' detail',
            dataIndex: 'Detail',
            render: (text, record) => <a onClick={() => seeDetailBook(record)}>xem chi tiet</a>
        },
    ];
    const [book, setbook] = useState({});
    const seeDetailBook = async (record) => {
        setdetailBookStatus(true)
        await setbook(record)
    }




    const confirmDelete = (_id) => {
        dispatch(deleteBook(_id))
    }

    function cancel(e) {
        console.log(e);
    }



    // all component about file 


    const onFinish = (value) => {

        const { name, price, stock, descreption, nxb, category } = value
        const form = new FormData();
        form.append('name', name)
        form.append('price', price)
        form.append('stock', stock)
        form.append('descreption', descreption)
        form.append('nxb', nxb)
        form.append('category', category)
        form.append('pictureBook', bookImage)
        dispatch(createBook(form))
    }


    const handleCategoryImage = (e) => {
        setbookImage(e.target.files[0]);
    }
    return (
        <Layout>
            <div style={{ padding: '50px', width: '100%' }}>
                <div>
                    <Button type="primary" onClick={showModal} icon={<BookOutlined />} >
                        Thêm đầu sách
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
                            autoComplete="off"
                        >
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập tên sách' }]}
                            >
                                <Input placeholder="Tên đầu sách" />
                            </Form.Item>
                            <Form.Item
                                name="price"
                                rules={[{ required: true, message: 'Vui lòng nhập giá sách' }]}
                            >
                                <InputNumber min={1} max={10000000} placeholder="giá" style={{ width: '100 %' }} />
                            </Form.Item>
                            <Form.Item
                                name="stock"
                                rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                            >
                                <InputNumber min={1} max={100} placeholder="số lượng" style={{ width: '100 %' }} />
                            </Form.Item>

                            <Form.Item
                                name="nxb"
                                rules={[{ required: true, message: 'Vui lòng nhập nhà xuất bản' }]}
                            >
                                <Select placeholder="Nhà xuất bản">
                                    {listNxb.map(nxb => {
                                        return <Option key={nxb.value} value={nxb.value}>{nxb.name}</Option>
                                    })}

                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="category"
                                rules={[{ required: true, message: 'Vui lòng nhập thể loại' }]}
                            >
                                <Select placeholder="Thể loại">
                                    {listCategory.map(nxb => {
                                        return <Option key={nxb.value} value={nxb.value}>{nxb.name}</Option>
                                    })}

                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="descreption"
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả về sách' }]}
                            >
                                <TextArea placeholder="Mô tả về sách" allowClear />

                            </Form.Item>

                            <Form.Item
                                name="pictureBook"
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả về sách' }]}
                            >
                                <input type="file" onChange={handleCategoryImage} />
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


                    {/* detail book  */}
                    <Modal
                        title="Chi tiết sách "
                        visible={detailBookStatus}
                        footer={false}
                        onOk={handleOk}
                        onCancel={() => setdetailBookStatus(false)}
                    >
                        <div className="detailBook">
                            {
                                (JSON.stringify(book) === '{}') ? null :
                                    <div>
                                        <img src={generatePublicUrl(book.pictureBook)} />
                                        <p>Tên sách: {book.name}</p>
                                        <p>Nhà xuất bản:{book.nxb.name}</p>
                                        <p>Thể loại:{book.category.name}</p>
                                        <p>Giá: {book.price} VNĐ</p>
                                        <p>Số lượng: {book.stock} cuốn</p>
                                        <p>Đã thuê: {book.borrowed ? book.borrowed : 0} cuốn</p>
                                        <p>Còn: {book.stock - (book.borrowed ? book.borrowed : 0)} cuốn</p>
                                        <p>Mô tả: {book.descreption}</p>
                                    </div>
                            }


                        </div>

                    </Modal>
                </div>
                <div className="listPublisingManage">
                    <p>Danh sách đầu sách</p>
                    {books.book ? <Table columns={columns} dataSource={books.book} style={{ width: '100%!important' }} /> : null}

                </div>
            </div>
        </Layout>
    );
}

export default Index;
