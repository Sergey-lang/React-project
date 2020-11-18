import {instance} from './api';

export const authAPI = {
   authMe() {
      return instance.get(`auth/me`)
   },

   loginMe(email,password,rememberMe,captcha) {
      return instance.post(`auth/login`,{email,password,rememberMe,captcha})
   },

   logoutMe(email,password,rememberMe,captcha) {
      return instance.delete(`auth/login`,{email,password,rememberMe,captcha})
   },
}