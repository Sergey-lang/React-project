import * as axios from 'axios';

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': 'df7067be-2d31-4254-bfe8-1f6d53d6c9b4'
	}
});

export const usersAPI = {
	getUsers(currentPage = 1,pageSize = 10) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
		.then(response => {
			return response.data;
		})
	}
}


