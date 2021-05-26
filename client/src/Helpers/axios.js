import axios from "axios";
import {api } from "../UrlConfig/UrlConfig"

const token = window.localStorage.getItem('token')

const axiosInstance = axios.create({
    baseURL : api,
    headers : {
        'Authorization' : token ? `${token}` : ''
    }
})

export default axiosInstance;