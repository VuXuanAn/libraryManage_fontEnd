import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import {
    DatabaseOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
    OrderedListOutlined,
    ContainerOutlined,
    TransactionOutlined
} from '@ant-design/icons';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../actions/user.action';
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
            <div className="header">
                <Button type="primary" onClick={toggleCollapsed} style={{ margin: 10 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
                <p>{auth.user.fullName}</p>
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    className="menu"
                >
                    <SubMenu key="sub1" icon={<DatabaseOutlined />} title="Quản lí tài liệu">
                        <Menu.Item key="2"><NavLink exact to={`/nha-xuat-ban`}>Nhà xuất bản</NavLink></Menu.Item>
                        <Menu.Item key="3"><NavLink exact to={`/the-loai`}>Thể loại</NavLink></Menu.Item>
                        <Menu.Item key="4"><NavLink to={`/dau-sach`}>Đầu sách</NavLink></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="5" icon={<UserOutlined />}>
                        <NavLink exact to={`/quan-li-doc-gia`}>Quản lí đọc giả</NavLink>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<TransactionOutlined />}>
                        <NavLink to={`/quan-li-muon`} >Quản lí mượn</NavLink>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<ContainerOutlined />}>
                        <Menu.Item key="8">  <NavLink to={`/quan-li-blog`}>Blog</NavLink></Menu.Item>
                    </Menu.Item>
                    <Menu.Item key="9" icon={<OrderedListOutlined />}>
                        <NavLink to={`/thong-ke-bao-cao`}>Thống kê báo cáo</NavLink>
                    </Menu.Item>
                    <Menu.Item key="10" icon={<LogoutOutlined />} onClick={logoutHandler}>
                        Đăng xuất
                    </Menu.Item>
                </Menu>
                <>
                    {props.children}
                </>
            </div>
        </div>
    );
}

export default Layout;
