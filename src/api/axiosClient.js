/* eslint-disable import/first */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
// import queryString from 'query-string';
const axios = window.axios;
import { token } from './authApi.js'; // Đảm bảo chỉ đường dẫn tới authApi.js đúng

const axiosClient = axios.create(
    {
        baseURL: 'http://157.119.251.57:20004/api',
        // baseURL:'https://localhost:7080/api',
        //baseURL:'https://apigatewayservertest2.yoot.vn/sharing/api',
        headers: {
            'Content-Type': 'application/json',
        },
        // paramsSerializer: params => queryString.stringify(params),
    }

);

//Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
  // console.log('Interceptor: Request is being processed'); // Add this line

    // Do something before request is sent
    // (config) => {
      const token = localStorage.getItem('token');
      // console.log('Token from localStorage:', token); // Log token value
      if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    // }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data.content;
    //return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default axiosClient;
