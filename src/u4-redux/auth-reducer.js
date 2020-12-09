import {authAPI} from '../u5-api/auth-api'
import {stopSubmit} from 'redux-form'

let initializeState = {
   id: null,
   email: null,
   login: null,
   isFetching: true,
   isAuth: false
}

export const authReducer = (state = initializeState, action) => {
   switch (action.type) {
      case SET_USER_DATA:
         return {
            ...state,
            ...action.data,
         }
      case TOGGLE_IS_FETCHING: {
         return {...state, isFetching: action.isFetching}
      }
      default:
         return state
   }
}

//Actions Type
const TOGGLE_IS_FETCHING = 'AUTH/IS_FETCHING'
const SET_USER_DATA = 'AUTH/SET_USER_DATA'

//Actions
export const setAuthUserData = (id, email, login, isAuth) => (
    {type: SET_USER_DATA, data: {id, email, login, isAuth}})

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

//Thunks
export const getAuthUserData = () => async (dispatch) => {
   let response = await authAPI.authMe()
   if (response.data.resultCode === 0) {
      let {id, login, email} = response.data.data
      dispatch(setAuthUserData(id, login, email, true))
   }
}

export const login = (email, password, rememberMe) => async (dispatch) => {
   let response = await authAPI.login(email, password, rememberMe)
   if (response.data.resultCode === 0) {
      dispatch(getAuthUserData(email, password, rememberMe))
   } else {
      let messages = response.data.messages.length > 0 ? response.data.messages[0] : 'some error'
      dispatch(stopSubmit('login', {_error: messages}))
   }
}

export const logout = () => async (dispatch) => {
   let response = await authAPI.logout()
   if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
   }
}