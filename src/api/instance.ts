import axios, { AxiosInstance } from "axios";

const corsAnywhereUrl: string = 'https://cors-anywhere.herokuapp.com/';
const url: string = process.env.REACT_APP_API_COURSES ?? "";

const config: AxiosInstance = axios.create({
    baseURL: corsAnywhereUrl + url,
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET',
    //     'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    // },
});

export default config;