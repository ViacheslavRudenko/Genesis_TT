import { AxiosError, AxiosResponse } from 'axios'
import axios from './instance'
import { getToken } from './token';

export const getCourses = async () => {
    const token = await getToken()

    try {
        const response: AxiosResponse = await axios.get('core/preview-courses', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })

        return response.data
    }
    catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.message;
    }
}