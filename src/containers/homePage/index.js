import React from 'react';
import Layout from '../../components/Layout'
import { HomeOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import './style.css'
const Index = () => {
    return (
        <Layout icon={<HomeOutlined className='iconOfItem' />} title={'Trang chủ'}>
            <div style={{ padding: '50px' }}>
                <div>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={15} style={{ backgroundColor: '#ffe4e4' }}>
                            <div>Đây là khối biểu đồ</div>
                        </Col>
                        <Col className="gutter-row" span={9}>
                            <div className='figures'>
                                <div className="sumary">
                                    <div class="single_sales">
                                        <span>Paid Visit</span>
                                        <h3>6550</h3>
                                    </div>
                                    <div class="single_sales">
                                        <span>Paid Visit</span>
                                        <h3>6550</h3>
                                    </div>
                                    <div class="single_sales">
                                        <span>Paid Visit</span>
                                        <h3>6550</h3>
                                    </div>
                                    <div class="single_sales">
                                        <span>Paid Visit</span>
                                        <h3>6550</h3>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Layout>
    );
}

export default Index;
