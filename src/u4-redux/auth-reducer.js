import {authAPI} from '../u5-api/auth-api'
import {stopSubmit} from 'redux-form'
import {securityAPI} from '../u5-api/security-api'

let initializeState = {
   id: null,
   email: null,
   login: null,
   isFetching: true,
   isAuth: false,
   captchaUrl: null
}

export const authReducer = (state = initializeState, action) => {
   switch (action.type) {
      case SET_USER_DATA:
      case GET_CAPTCHA_URL:
         return {
            ...state,
            ...action.payload,
         }
      default:
         return state
   }
}

//Actions Type
const SET_USER_DATA = 'AUTH/SET_USER_DATA'
const GET_CAPTCHA_URL = 'AUTH/GET-CAPTCHA-URL'

//Actions
export const setAuthUserData = (id, email, login, isAuth) => (
    {type: SET_USER_DATA, payload: {id, email, login, isAuth}})

export const getCaptchaUrlSuccess = (captchaUrl) => (
    {type: GET_CAPTCHA_URL, payload: {captchaUrl}})

// export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

//Thunks
export const getAuthUserData = () => async (dispatch) => {
   let response = await authAPI.authMe()
   if (response.data.resultCode === 0) {
      let {id, login, email} = response.data.data
      dispatch(setAuthUserData(id, login, email, true))
   }
}

export const login = (email, password, rememberMe, captcha=null) => async (dispatch) => {
   let response = await authAPI.login(email, password, rememberMe, captcha)
   if (response.data.resultCode === 0) {
      dispatch(getAuthUserData())
   } else {
      //captcha
      if (response.data.resultCode === 10) {
         dispatch(getCaptchaUrl())
      }
      //incorrect form value
      let messages = response.data.messages.length > 0 ? response.data.messages[0] : 'some error'
      dispatch(stopSubmit('login', {_error: messages}))
   }
}

export const getCaptchaUrl = () => async (dispatch) => {
   const response = await securityAPI.getCaptcha()
   const captchaUrl = response.data.url
   dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch) => {
   let response = await authAPI.logout()
   if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
   }
}