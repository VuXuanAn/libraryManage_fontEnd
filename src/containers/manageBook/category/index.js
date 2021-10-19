import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../../actions/category.action';
import Layout from '../../../components/Layout'
import { UnorderedListOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'

const originData = [];

for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


const Index = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch()
    const [name, setname] = useState('');
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
        dispatch(createCategory(name))
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    }
    const categories = useSelector(state => state.categories)

    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.name === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            ...record,
        });
        setEditingKey(record.name);
    };

    const cancel = () => {
        setEditingKey('');
    };
    const save = async (name) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => name === item.name);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '35%',
            editable: true,
        },
        {
            title: 'Action',
            key: '_id',
            dataIndex: '_id',
            render: _id =>
                <div>
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => deleteCategory(_id)}
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
    const deleteCategory = (_id) => {
        alert(_id)
    }
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });


    return (
        <Layout icon={<UnorderedListOutlined className='iconOfItem' />} title={'Thể loại'}>
            <div>
                <Button type="primary" onClick={showModal}  >
                    Thêm thể loại
                </Button>
                <Modal
                    title="Thêm nhà xuất bản"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Input placeholder="Tên thể loại" onChange={e => setname(e.target.value)} value={name} />
                </Modal>

                <p style={{ marginTop: '50px' }}>Danh sách thể loại</p>
                <ul>
                    <Form form={form} component={false}>
                        <Table
                            bordered
                            dataSource={categories.categories}
                            columns={mergedColumns}
                        />
                    </Form>
                </ul>
            </div>
        </Layout>
    );
}

export default Index;
