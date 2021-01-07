import React from 'react'

import {Navbar} from './u3-pages/Navbar/Navbar'
import {News} from './u3-pages/News/News'
import {Music} from './u3-pages/Music/Music'
import {Settings} from './u3-pages/Settings/Settings'
import {Preloader} from './u2-components/common/preloader/Preloader'
import HeaderContainer from './u3-pages/Header/HeaderContainer'

import store from './u4-redux/store'
import {BrowserRouter, Redirect, Route, withRouter,Switch} from 'react-router-dom'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './u4-redux/app-reducer'

import {withSuspense} from './u2-components/hoc/withSuspense'

import './App.css'
import {Page404} from './u3-pages/Page404'

const Login = React.lazy(() => import('./u3-pages/Login/Login'))
const ProfileContainer = React.lazy(() => import('./u3-pages/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./u3-pages/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./u3-pages/Users/UsersContainer'))

class App extends React.Component {

   catchAllUnhandledErrors(reason, promise){
      alert('seme error')
   }

   componentDidMount() {
      this.props.initializeApp()
   window.addEventListener('unhandledrejection',this.catchAllUnhandledErrors)
   }

   componentWillUnmount() {
      window.removeEventListener('unhandledrejection',this.catchAllUnhandledErrors)
   }

   render() {
      //check initialization before start
      if (!this.props.initialized) {
         return <Preloader/>
      }

      return (
          <div className='all_wrapper'>
             <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                   <Switch>
                      <Route exact path="/" render={() => <Redirect to='/profile'/>}/>
                      <Route path='/login' render={withSuspense(Login)}/>
                      <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                      <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                      <Route path='/news' render={() => <News/>}/>
                      <Route path='/music' render={() => <Music/>}/>
                      <Route path='/settings' render={() => <Settings/>}/>
                      <Route path='/users' render={withSuspense(UsersContainer)}/>
                      <Route render={() => <Page404/>}/>
                   </Switch>
                </div>
             </div>
          </div>
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
