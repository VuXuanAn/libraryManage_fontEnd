import { Button, Input, Form, Modal, Upload, Card } from 'antd';
import React, { useState } from 'react';
import Layout from '../../components/Layout'
import { FileAddOutlined, SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../../actions/blog.action';
import Meta from 'antd/lib/card/Meta';
import { generatePublicUrl } from '../../urlConfig';

const { TextArea } = Input;
const Index = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageBlog, setimageBlog] = useState('');
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
        const { title, content } = value
        const form = new FormData();

        form.append('title', title)
        form.append('content', content)
        form.append('pictureBlog', imageBlog)
        dispatch(createBlog(form))

    }

    const imageBlogHandler = (e) => {
        setimageBlog(e.target.files[0])
    }
    const blogs = useSelector(state => state.blogs)
    return (
        <Layout>
            <div style={{ padding: '50px', width: '100%' }}>
                <Button icon={<FileAddOutlined />} onClick={showModal}>Thêm bài viết</Button>

                <Modal
                    title="Thêm bài viết mới"
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
                            name="title"
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                        >
                            <Input placeholder="Tiêu đề" />
                        </Form.Item>

                        <Form.Item
                            name="content"
                            rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
                        >
                            <TextArea placeholder="Nội dung" allowClear />

                        </Form.Item>
                        <Form.Item
                            name="image"
                            rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
                        >
                            <input type="file" onChange={imageBlogHandler} />

                        </Form.Item>




                        <Form.Item wrapperCol={{ span: 24 }} >
                            <Button type="primary" htmlType="submit" style={{ marginRight: 'auto' }}>
                                Thêm bài viết
                            </Button>
                            <Button type="primary" style={{ float: 'right' }}>
                                Hủy
                            </Button>
                        </Form.Item>
                    </Form>


                </Modal>
                <p style={{ margin: '50px 0px' }}>Danh sách bài viết</p>
                <div style={{ display: 'flex' }} >
                    {blogs.blogs.map(blog => {
                        return (
                            <Card
                                style={{ width: '33%', marginRight: '20px' }}
                                cover={
                                    <img
                                        alt="example"
                                        src={generatePublicUrl(blog.pictureBlog)}
                                    />
                                }
                                actions={[
                                    <SettingOutlined key="setting" />,
                                    <EditOutlined key="edit" />,
                                    <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    title={blog.title}
                                    description={blog.content}
                                />
                            </Card>
                        )
                    })}

                </div>
            </div>
        </Layout >
    );
}

export default Index;
