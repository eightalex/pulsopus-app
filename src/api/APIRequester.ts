import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { AuthService } from '@/api/services/auth.service.ts';
import { API_URL, IS_DEV } from '@/config';
import sessionManager from './SessionManager.ts';

export class APIRequester {
	protected restInstance: AxiosInstance;
	public readonly authService: AuthService;

	constructor() {
		this.restInstance = this.createAxiosInstance();

		this.authService = new AuthService(this.restInstance);
	}

	private createAxiosInstance() {
		const axiosDefaults = {
			withCredentials: false,
			baseURL: API_URL,
		} as CreateAxiosDefaults;
		const axiosInstance = axios.create(axiosDefaults);

		axiosInstance.interceptors.request.use(
			async request => {
				const token = sessionManager.token;
				request.headers['Authorization'] = `Bearer ${token}`;
				return request;
			},
			(error) => Promise.reject(error)
		);

		axiosInstance.interceptors.response.use(
			(response) => {
				if (response.data?.token) {
					sessionManager.setToken(response.data.token);
				}
				return response;
			},
			async (error) => {
				if (error.response && error.response.status === 401) {
					// dev p2p interceptors
					if (IS_DEV) {
						// alert('401 error ' + JSON.stringify(error.response, null, 4));
					}
				}
				// const originalConfig = error.config;
				// const requestError = new RequestError(error);
				//
				// const authPath = (originalConfig.url as string)
				// 	.split('/')
				// 	.find((u) => ['login', 'register'].includes(u));
				//
				// if (!authPath && error.response.status === 401 && !originalConfig._retry) {
				// 	originalConfig._retry = true;
				//
				// 	try {
				// 		const { refreshToken } = await this.authService.getTokens();
				// 		const refreshUrl = `${originalConfig.baseURL}/auth/refresh`;
				// 		const headers = { Authorization: `Bearer ${refreshToken}` };
				// 		const data = await axios
				// 			.get<IAuthAuthorize>(refreshUrl, { headers })
				// 			.then(r => r.data as IAuthAuthorize);
				// 		await this.authService.setTokens(data);
				// 		return axiosInstance(originalConfig);
				// 	} catch (_error) {
				// 		await this.authService.clearTokens();
				// 		//TODO: how to get router instance ?
				// 		// router.push({path: "/login"})
				//
				// 		// @ts-expect-error: _error typeof unknown
				// 		return Promise.reject(_error.response);
				// 	}
				// }
				return Promise.reject(error.response);
			}
		);

		return axiosInstance;
	}
}

export default new APIRequester();
