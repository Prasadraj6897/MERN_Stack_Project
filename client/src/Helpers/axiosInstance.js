// import axios from "axios";
// import {api } from "../UrlConfig/UrlConfig"

// const token = window.localStorage.getItem('token')

// const axiosInstance = axios.interceptors.request.use(
//     config => {
//       const { origin } = new URL(config.url);
//       const allowedOrigins = [api];
//       const token = localStorage.getItem('token');
//       if (allowedOrigins.includes(origin)) {
//         config.headers.authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
//   );

// const axiosInstance = axios.create({
//     baseURL : api,
//     headers : {
//         'Authorization' : token ? `${token}` : ''
//     }
// })

// export default axiosInstance;