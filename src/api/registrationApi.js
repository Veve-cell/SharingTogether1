/* eslint-disable prettier/prettier */
import axiosClient from "./axiosClient";

// const config = {
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//   }
// };


const registrationApi = {
  getAll(params) {
    const url = '/ARegistration/GetAll';
    return axiosClient.get(url, { params });
  },
  update(data) {
    const url = '/ARegistration/UpdateStatus';
    return axiosClient.put(url, data);
    // return axiosClient.put(url, data, { withCredentials: true }, config);
  },
};

export default registrationApi;
