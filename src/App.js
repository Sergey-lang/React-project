import React from 'react'

import {compose} from 'redux'
import store from './u4-redux/store'
import {connect, Provider} from 'react-redux'

import {News} from './u3-pages/News/News'
import {Music} from './u3-pages/Music/Music'
import {Settings} from './u3-pages/Settings/Settings'
import {Page404} from './u3-pages/Page404'
import {Preloader} from './u2-components/common/preloader/Preloader'

import {initializeApp} from './u4-redux/app-reducer'
import {withSuspense} from './u2-components/hoc/withSuspense'
import {BrowserRouter, Link, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu} from 'antd';
import 'antd/dist/antd.css';
import {AppHeader} from './u3-pages/Header/Header';

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;

const Login = React.lazy(() => import('./u3-pages/Login/Login'))
const ProfileContainer = React.lazy(() => import('./u3-pages/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./u3-pages/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./u3-pages/Users/UsersContainer'))

class App extends React.Component {

    catchAllUnhandledErrors(reason, promise) {
        alert('seme error')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <Layout>
                <AppHeader/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="Profile">
                                    <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/dialogs">Messages</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                    <Menu.Item key="5"><Link to="/developers">Developers</Link></Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Switch>
                                <Route exact path="/" render={() => <Redirect to='/profile'/>}/>
                                <Route path='/login' render={withSuspense(Login)}/>
                                <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                                <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                                <Route path='/news' render={() => <News/>}/>
                                <Route path='/music' render={() => <Music/>}/>
                                <Route path='/settings' render={() => <Settings/>}/>
                                <Route path='/developers' render={withSuspense(UsersContainer)}/>
                                <Route render={() => <Page404/>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>ANT DESIGN</Footer>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

export const MainApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}
