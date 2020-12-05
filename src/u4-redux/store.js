import {applyMiddleware, combineReducers, createStore} from 'redux';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';
import {usersReducer} from './users-reducer';
import {authReducer} from './auth-reducer';
import {appReducer} from './app-reducer';
import thinkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'

let reducers = combineReducers({
   profilePage: profileReducer,
   dialogsPage: dialogsReducer,
   usersPage: usersReducer,
   auth: authReducer,
   form: formReducer,
   app: appReducer
});

let store = createStore(reducers, applyMiddleware(thinkMiddleware));

window.store = store;
export default store;