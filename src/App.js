import React from 'react';
import './App.css';
import {Navbar} from './u3-features/Navbar/Navbar';
import {News} from './u3-features/News/News';
import {Music} from './u3-features/Music/Music';
import {Settings} from './u3-features/Settings/Settings';
import {Route, withRouter} from 'react-router-dom';
import HeaderContainer from './u3-features/Header/HeaderContainer';
import ProfileContainer from './u3-features/Profile/ProfileContainer';
import DialogsContainer from './u3-features/Dialogs/DialogsContainer';
import UsersContainer from './u3-features/Users/UsersContainer';
import Login from './u3-features/Login/Login';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {initializeApp} from './u4-redux/app-reducer';
import {Preloader} from './u2-components/common/preloader/Preloader';

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='all_wrapper'>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

