import React, { useState } from 'react';
import Layout from './../../../components/Layout'
import { Button, Popconfirm } from 'antd';
import { BookOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import ModalToAddBook from './ModalToAddBook'
import { createBook, deleteBook } from '../../../actions/book.action';
import './style.css'
import ModalToShowBook from './ModalShowBook'
const Index = () => {
    const [detailBookStatus, setdetailBookStatus] = useState(false);
    const [bookImage, setbookImage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalToEditVisible, setmodalToEditVisible] = useState(false);
    const [book, setbook] = useState({});


    const dispatch = useDispatch()
    const showModal = () => {
        setIsModalVisible(true);
    };
    //fetch data from store
    const books = useSelector(state => state.book)
    const categories = useSelector(state => state.categories)
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

    //config table
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
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (text, record) =>
                <div>
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => confirmDelete(record._id)}
                        okText="Yes"
                        cancelText="No"

                    >
                        <DeleteOutlined style={{ marginRight: '20px', color: 'red' }} />
                    </Popconfirm>
                    <a onClick={() => seeDetailBook(record)}><EditOutlined style={{ color: 'green', marginRight: '20px', }} /></a>
                    <a onClick={() => seeDetailBook(record)}><EyeOutlined /></a>
                </div>
        }
    ];

    const confirmDelete = (_id) => {
        dispatch(deleteBook(_id))
    }

    //detail book
    const seeDetailBook = async (record) => {
        setdetailBookStatus(true)
        await setbook(record)
    }

    // edit book 


    // function and param for add 
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
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    return (
        <Layout icon={<BookOutlined className='iconOfItem' />} title={'Đầu sách'}>
            <div >
                <div>
                    <Button type="primary" onClick={showModal} icon={<BookOutlined />} >
                        Thêm đầu sách
                    </Button>

                    {/* add book  */}
                    <ModalToAddBook
                        isModalVisible={isModalVisible}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        onFinish={onFinish}
                        listNxb={listNxb}
                        listCategory={listCategory}
                        handleCategoryImage={handleCategoryImage}
                    />
                    {/* detail book  */}
                    <ModalToShowBook
                        detailBookStatus={detailBookStatus}
                        handleOk={handleOk}
                        book={book}
                        handlerClose={() => setdetailBookStatus(false)}
                    />
                </div>


                {/* list of books*/}
                <div className="listPublisingManage">
                    <p>Danh sách đầu sách</p>
                    {books.book ? <Table columns={columns} dataSource={books.book} style={{ width: '100%!important' }} /> : null}
                </div>
            </div>
        </Layout >
    );
}

export default Index;
