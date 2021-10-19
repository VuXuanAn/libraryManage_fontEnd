import React, { useState } from 'react';
import { Menu, Button, Badge } from 'antd';
import { NavLink } from 'react-router-dom';
import {
    DatabaseOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
    GiftOutlined,
    ContainerOutlined,
    TransactionOutlined,
    HomeOutlined,
    ShareAltOutlined,
    SearchOutlined,
    BellOutlined,
    MessageOutlined
} from '@ant-design/icons';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../actions/user.action';
import Search from 'antd/lib/input/Search';
const { SubMenu } = Menu;
const Layout = (props) => {
    const dispatch = useDispatch()
    const [collapsed, setcollapsed] = useState(false);
    const toggleCollapsed = () => {
        setcollapsed(!collapsed)
    };
    const auth = useSelector(state => state.auth);
    const logoutHandler = () => {
        dispatch(signOut())
    }
    return (
        <div>

            <div style={{ display: 'flex', width: '100%' }}>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    className="menu"
                >
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <NavLink exact to={`/`}>Trang chủ</NavLink>
                    </Menu.Item>

                    <Menu.Item key="5" icon={<UserOutlined />}>
                        <NavLink to={`/`}>Quản lí hồ sơ bệnh ánh</NavLink>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<TransactionOutlined />}>
                        <NavLink to={`/medical/patient`} >Quản lí thông tin bệnh nhân</NavLink>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<ContainerOutlined />}>
                        <NavLink to={`/medical/assurance`}>Quản lí bảo hiểm</NavLink>
                    </Menu.Item>
                    <Menu.Item key="8" icon={<GiftOutlined />}>
                        <NavLink to={`/medical/profile`}>Thống kê báo cáo </NavLink>
                    </Menu.Item>
                    <Menu.Item key="9" icon={<LogoutOutlined />} onClick={logoutHandler}>
                        Đăng xuất
                    </Menu.Item>
                </Menu>

                <>
                    <div style={{ padding: '50px 50px 50px 50px', width: '100%', backgroundColor: '#FBF6F0' }}>

                        <div className="header">
                            <Button type="primary" onClick={toggleCollapsed}>
                                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                            </Button>
                            <div>
                                <SearchOutlined style={{ marginRight: '13px', fontSize: '25px', }} />
                                <Badge count={5} offset={[-15, 0]}>
                                    <BellOutlined style={{ fontSize: '25px', marginRight: '13px' }} />
                                </Badge>
                                <Badge count={5} offset={[-15, 0]}>
                                    <MessageOutlined style={{ fontSize: '25px', marginRight: '13px' }} />
                                </Badge>
                            </div>
                        </div>

                        <div className="containerOfItem">
                            <div >
                                {props.icon}
                                <h1>{props.title}</h1>
                                {props.children}
                            </div>
                        </div>
                    </div>

                </>
            </div>
        </div>
    );
}

export default Layout;
