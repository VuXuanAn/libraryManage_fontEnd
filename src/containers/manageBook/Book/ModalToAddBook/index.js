import { Button, Input, InputNumber, Select, Modal, Form } from 'antd';
import React from 'react';
const { Option } = Select;
const { TextArea } = Input;


const Index = (props) => {
    const {
        isModalVisible,
        handleOk,
        handleCancel,
        onFinish,
        listNxb,
        listCategory,
        handleCategoryImage
    } = props
    return (
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
    );
}

export default Index;
