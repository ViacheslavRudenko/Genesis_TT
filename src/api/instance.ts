import axios, { AxiosInstance } from "axios";

const url: string = process.env.REACT_APP_API_COURSES ?? "";

const config: AxiosInstance = axios.create({
    baseURL: url,

});

export default config;