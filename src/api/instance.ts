import axios, { AxiosInstance } from "axios";

const url: string = process.env.REACT_APP_API_COURSES || "";
const token: string = process.env.REACT_APP_API_TOKEN || "";

const config: AxiosInstance = axios.create({
    baseURL: url,
    headers: {
        Authorization: `Bearer ${token}`
    },

});

export default config;