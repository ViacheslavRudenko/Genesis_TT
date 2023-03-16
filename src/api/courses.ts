import { AxiosError, AxiosResponse } from 'axios'
import axios from './instance'
import { getToken } from './token';

export const getCourses = async () => {
    await getToken()

    try {
        const response: AxiosResponse = await axios.get('core/preview-courses')
        return response.data
    }
    catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.message;
    }
}