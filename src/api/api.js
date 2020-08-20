import * as axios from 'axios';

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': 'be9a3549-d8d6-4d97-a73c-6593dde1f694'
	}
});

export const usersAPI = {

	getUsers(currentPage = 1, pageSize = 10) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => {
				return response.data;
			});
	},
	follow(userId) {
		return instance.post(`follow/${userId}`)
			.then(response => {
				return response.data;
			});
	},
	unfollow(userId) {
		return instance.delete(`follow/${userId}`)
			.then(response => {
				return response.data;
			});
	},
	getProfile(userId) {
		console.warn('Obselete method. Please profileAPI object');
		return profileAPI.getProfile(userId);
	},
}

export const profileAPI = {
	getProfile(userId) {
		return instance.get(`profile/` + userId);
	},
	getStatus(userId) {
		return instance.get(`profile/status/` + userId);
	},
	updateStatus(status) {
		return instance.put(`profile/status/`, {status: status});
	},
}

export const authAPI = {
	authMe() {
		return instance.get(`auth/me`)
	},
}


