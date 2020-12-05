import {instance} from './api';

export const profileAPI = {
   getProfile(userId) {
      return instance.get(`profile/${userId}`)
         .then(res => {
            return res.data
         });
   },

   getUserStatus(userId) {
      return instance.get(`profile/status/${userId}`)
         .then(res => res);
   },

   updateOwnProfileStatus(status) {
      return instance.put(`profile/status/`,{status})
         .then(res => {
            return res.data
         });
   },
}