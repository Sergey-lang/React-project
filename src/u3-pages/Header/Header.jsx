import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentUserLogin, selectIsAuth} from '../../u4-redux/auth-selectors';
import {logout} from '../../u4-redux/auth-reducer';

import {Avatar, Button, Col, Layout, Menu, Row} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Header} from 'antd/lib/layout/layout';

export const AppHeader = () => {

    const dispatch = useDispatch()

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const logOut = () => {
        dispatch(logout())
    }

    const {Header} = Layout

    return (
        <Header className="header">
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link to="/users">Developers</Link></Menu.Item>
                    </Menu>
                </Col>
                {
                    isAuth
                        ? <><Col span={1}>
                            <Avatar title={login} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                        </Col>
                            <Col span={5}>
                                <Button onClick={logOut}>log out</Button>
                            </Col>
                        </>
                        : <Col span={6}>
                            <Button>
                                <Link to={'/login'}>Login</Link>
                            </Button>
                        </Col>
                }
            </Row>
        </Header>
    )
}


