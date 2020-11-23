import {authAPI} from '../api/auth-api';
import {stopSubmit} from 'redux-form';

const TOGGLE_IS_FETCHING = 'IS_FETCHING';
const SET_USER_DATA = 'SET_USER_DATA'

let initializeState = {
   id: null,
   email: null,
   login: null,
   isFetching: true,
   isAuth: false
};

export const authReducer = (state = initializeState, action) => {
   switch (action.type) {
      case SET_USER_DATA:
         return {
            ...state,
            ...action.data,
         };
      case TOGGLE_IS_FETCHING: {
         return {...state, isFetching: action.isFetching}
      }
      default:
         return state;
   }
}

export const setAuthUserData = (id, email, login, isAuth) => (
   {type: SET_USER_DATA, data: {id, email, login, isAuth}});

export const toggleIsFetching = (isFetching) => (
   {type: TOGGLE_IS_FETCHING, isFetching});

export const getAuthUserData = () => {
   return (dispatch) => {
      authAPI.authMe()
         .then(response => {
            if (response.data.resultCode === 0) {
               let {id, login, email, isAuth} = response.data.data;
               dispatch(setAuthUserData(id, login, email, true));
            }
         });
   }
}

export const login = (email, password, rememberMe) => {
   return (dispatch) => {
      authAPI.login(email, password, rememberMe)
         .then(response => {
            if (response.data.resultCode === 0) {
               dispatch(getAuthUserData(email, password, rememberMe));
            } else {
               let messages = response.data.messages.length > 0 ? response.data.messages[0] : 'some error';
               dispatch(stopSubmit('login', {_error: messages}))
            }
         });
   }
}

export const logout = () => {
   return (dispatch) => {
      authAPI.logout()
         .then(response => {
            if (response.data.resultCode === 0) {
               dispatch(setAuthUserData(null, null, null, false));
            }
         });
   }
}