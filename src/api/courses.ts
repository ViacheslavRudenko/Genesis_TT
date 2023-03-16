import { AxiosError, AxiosResponse } from 'axios'
import { CourseTypes } from '../types/course';
import axios from './instance'
import { getToken } from './token';

export const getCourses = async (): Promise<CourseTypes[]> => {
    await getToken()

    try {
        const response: AxiosResponse = await axios.get('core/preview-courses')
        return response.data.courses
    }
    catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.message;
    }
}