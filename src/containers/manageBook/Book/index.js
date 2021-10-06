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

    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch()
    const showModal = () => {
        setIsModalVisible(true);
    };

    const books = useSelector(state => state.book)
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
        console.log(book);

    }




    const confirmDelete = (_id) => {
        dispatch(deleteBook(_id))
    }

    function cancel(e) {
        console.log(e);
    }



    // all component about file 
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const [fileList, setFileList] = useState([]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };


    const onFinish = (value) => {
        if (fileList[0] === '') {
            message.warning('Vui lòng nhập hình ảnh');
        }
        const { name, price, stock, descreption, nxb } = value
        const form = new FormData();
        form.append('name', name)
        form.append('price', price)
        form.append('stock', stock)
        form.append('descreption', descreption)
        form.append('nxb', nxb)
        form.append('pictureBook ', fileList[0])
        dispatch(createBook(form))
    }

    //detail book
    const [detailBookStatus, setdetailBookStatus] = useState(false);


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
                                rules={[{ required: true, message: 'Vui lòng nhập nhaf xuaast ban' }]}
                            >
                                <Select placeholder="Nhà xuất bản">
                                    {listNxb.map(nxb => {
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

                            <ImgCrop rotate>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                >
                                    {fileList.length < 1 && '+ Upload'}
                                </Upload>
                            </ImgCrop>
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
                                        <p>Giá: {book.price} VNĐ</p>
                                        <p>Số lượng: {book.stock} cuốn</p>
                                        <p>Đã thuê: {book.borrowed} cuốn</p>
                                        <p>Còn: {book.stock - book.borrowed} cuốn</p>
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
