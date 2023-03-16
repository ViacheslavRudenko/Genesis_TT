import { AxiosError, AxiosResponse } from 'axios';
import customAxios from './instance'

export const getToken = async (): Promise<string> => {
    try {
        const response: AxiosResponse = await customAxios.get('auth/anonymous?platform=subscriptions')
        return response.data.token
    } catch (error) {
        const axiosError = error as AxiosError;
        const err: string = `Token error: ${axiosError.message}`
        throw err;
    }
}

