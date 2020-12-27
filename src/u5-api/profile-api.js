import {instance} from './api'

export const profileAPI = {
   getProfile(userId) {
      return instance.get(`profile/${userId}`)
          .then(res => {
             return res.data
          })
   },

   getUserStatus(userId) {
      return instance.get(`profile/status/${userId}`)
          .then(res => res)
   },

   updateOwnProfileStatus(status) {
      return instance.put(`profile/status/`, {status})
          .then(res => {
             return res.data
          })
   },
   savePhoto(photoFile) {
      const formData = new FormData()
      formData.append('image', photoFile)
      return instance.put(`profile/photo/`, formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      })
          .then(res => {
             return res.data
          })
   },
   saveProfile(profile) {
      return instance.put(`profile/`, profile)
          .then(res => {
             return res.data
          })
   },
}