import { AuthService, DepartmentsService, UsersService } from '@/api/services';
import { API_URL } from '@/config';
import { EventBus } from '@/helpers/EventBus';
import { IAPIRequester, IAuthAuthorize } from '@/interfaces';
import { RequestError } from '@/models';
import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

export default class APIRequester implements IAPIRequester {
	readonly requestErrorBus = new EventBus<RequestError>();
	public readonly authService: AuthService;
	public readonly usersService: UsersService;
	public readonly departmentsService: DepartmentsService;
	protected restInstance: AxiosInstance;

	constructor() {
		this.restInstance = this.createAxiosInstance();

		this.authService = new AuthService(this.restInstance);
		this.usersService = new UsersService(this.restInstance);
		this.departmentsService = new DepartmentsService(this.restInstance);
	}

	private createAxiosInstance() {
		const axiosDefaults = {
			withCredentials: false,
			baseURL: API_URL,
		} as CreateAxiosDefaults;
		const axiosInstance = axios.create(axiosDefaults);

		axiosInstance.interceptors.request.use(async request => {
			const { accessToken } = await this.authService.getTokens();
			request.headers['Authorization'] = `Bearer ${accessToken}`;
			return request;
		});

		axiosInstance.interceptors.response.use(
			response => response,
			async (error) => {
				const originalConfig = error.config;
				const requestError = new RequestError(error);

				const authPath = (originalConfig.url as string)
					.split('/')
					.find((u) => ['login', 'register'].includes(u));

				if(!error.response) {
					this.requestErrorBus.publish(requestError);
					return Promise.reject(error);
				}

				if (!authPath && error.response.status === 401 && !originalConfig._retry) {
					originalConfig._retry = true;

					try {
						const { refreshToken } = await this.authService.getTokens();
						const refreshUrl = `${originalConfig.baseURL}/auth/refresh`;
						const headers = { Authorization: `Bearer ${refreshToken}` };
						const data = await axios
							.get<IAuthAuthorize>(refreshUrl, { headers })
							.then(r => r.data as IAuthAuthorize);
						await this.authService.setTokens(data);
						return axiosInstance(originalConfig);
					} catch (_error) {
						await this.authService.clearTokens();
						//TODO: how to get router instance ?
						// router.push({path: "/login"})
						
						// @ts-expect-error: _error typeof unknown
						return Promise.reject(_error.response);
					}
				}
				this.requestErrorBus.publish(requestError);
				return Promise.reject(error.response);
			}
		);

		return axiosInstance;
	}
}
