import { AxiosError, AxiosResponse } from 'axios'
import { CourseTypes } from '../types/course';
import axios from './instance'
import { getToken } from './token';

export const getCourses = async (): Promise<CourseTypes[]> => {
    await getToken()
    try {
        const { data }: AxiosResponse = await axios.get(`core/preview-courses`)
        return data.courses
    }
    catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.message;
    }
}

export const getCourse = async (id: string = ''): Promise<CourseTypes> => {
    await getToken()
    try {
        const { data }: AxiosResponse = await axios.get(`core/preview-courses/${id}`)
        return data
    }
    catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.message;
    }
}




