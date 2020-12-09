import {instance} from './api'

export const usersAPI = {

   getUsers(currentPage = 1, pageSize = 10) {
      return instance.get(`users?page=${currentPage}&count=${pageSize}`)
          .then(response => {
             return response.data
          })
   },
   follow(userId) {
      return instance.post(`follow/${userId}`)
          .then(response => {
             return response.data
          })
   },
   unfollow(userId) {
      return instance.delete(`follow/${userId}`)
          .then(response => {
             return response.data
          })
   },
}