import * as axios from 'axios';

export const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': 'ec9092bf-d7c1-484e-b4e6-892ed49a92ea'
	}
});




