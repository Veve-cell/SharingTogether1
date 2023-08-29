/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import axiosClient from "./axiosClient";

const accountApi = {
  getAllUser(params) {
    const url = '/User/GetAll';
    return axiosClient.get(url, { params });
  },
  remove(userId) {
    const url = '/User/DeleteUserID';
    const data = { userId }; // Đóng gói tham số vào body
    return axiosClient.delete(url, { data });
  },
  // addUser(data){
  //   const url = '/AUser/CreateUserByAdmin';
  //   return axiosClient.post(url, data);
  // },

  addUser(data) {
    const url = '/AUser/CreateUserByAdmin';
    const method = 'post';

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return axiosClient.post(url, formData, config);
  },
  update(data) {
    const url = `/AUser/AdminUpdate`;
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return axiosClient.put(url, formData, config);
  },
}

export default accountApi;
