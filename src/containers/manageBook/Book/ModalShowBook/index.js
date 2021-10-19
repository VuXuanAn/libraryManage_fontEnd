import { Modal } from 'antd';
import React from 'react';
import { generatePublicUrl } from '../../../../urlConfig';

const Index = (props) => {
    const { detailBookStatus, handleOk, book, handlerClose } = props
    return (
        <Modal
            title="Chi tiết sách "
            visible={detailBookStatus}
            footer={false}
            width={800}
            onOk={handleOk}
            onCancel={handlerClose}
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
    );
}

export default Index;
