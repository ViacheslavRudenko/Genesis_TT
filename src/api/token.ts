import { AxiosError, AxiosResponse } from 'axios';
import config from './instance';
import customAxios from './instance'

export const getToken = async (): Promise<void> => {
    try {
        const response: AxiosResponse = await customAxios.get('auth/anonymous?platform=subscriptions')
        const token = response.data.token
        config.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
        const axiosError = error as AxiosError;
        const err: string = `Token error: ${axiosError.message}`
        throw err;
    }
}

