import axios, { AxiosInstance } from "axios";

const corsAnywhereUrl: string = 'https://cors-anywhere.herokuapp.com/';
const url: string = process.env.REACT_APP_API_COURSES ?? "";

const config: AxiosInstance = axios.create({
    baseURL: corsAnywhereUrl + url,
});

export default config;