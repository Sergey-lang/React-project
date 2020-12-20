import React from 'react'
import './App.css'
import {Navbar} from './u3-pages/Navbar/Navbar'
import {News} from './u3-pages/News/News'
import {Music} from './u3-pages/Music/Music'
import {Settings} from './u3-pages/Settings/Settings'
import {HashRouter, Route, withRouter} from 'react-router-dom'
import HeaderContainer from './u3-pages/Header/HeaderContainer'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './u4-redux/app-reducer'
import {Preloader} from './u2-components/common/preloader/Preloader'
import store from './u4-redux/store'
import {withSuspense} from './u2-components/hoc/withSuspense'

const Login = React.lazy(() => import('./u3-pages/Login/Login'))
const ProfileContainer = React.lazy(() => import('./u3-pages/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./u3-pages/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./u3-pages/Users/UsersContainer'))

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
                   <Route path='/login' render={withSuspense(Login)}/>
                   <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                   <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                   <Route path='/news' render={() => <News/>}/>
                   <Route path='/music' render={() => <Music/>}/>
                   <Route path='/settings' render={() => <Settings/>}/>
                   <Route path='/users' render={withSuspense(UsersContainer)}/>
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
       <HashRouter>
          <Provider store={store}>
             <AppContainer/>
          </Provider>
       </HashRouter>
   )
}
