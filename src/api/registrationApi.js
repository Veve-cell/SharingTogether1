/* eslint-disable prettier/prettier */
import axiosClient from "./axiosClient";

const registrationApi = {
    getAll(params) {
        const url = '/ARegistration/GetAll';
        return axiosClient.get(url, {params});
    },
};

export default registrationApi;
