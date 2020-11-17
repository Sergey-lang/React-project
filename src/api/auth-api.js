import {instance} from './api';

export const authAPI = {
   authMe() {
      return instance.get(`auth/me`)
   },
}