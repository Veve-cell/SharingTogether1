/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import axiosClient from "./axiosClient";

const authApi = {
  login: async (email, password) => {
    try {
      const url = '/Login/Login';
      const response = await axiosClient.post(url, { email, password });
      console.log('Response:', response); // Log the full response to inspect its structure

      // Get the token directly from the response
      const token = response.token;
      const {id, fullName, urlAvatar, roles} = response.login;

      //Xác thực và lưu trữ token sau khi người dùng đăng nhập thành công
      localStorage.setItem('token', token);
      //Lưu trữ thông tin người dùng trong local storage
      localStorage.setItem('user', JSON.stringify({id, fullName, urlAvatar, roles}));
      return token;
    } catch (error) {
      console.log('API Error:', error);
      throw new Error('Invalid username or password. Please try again.');
    }
  },
  logout: () => {
    // Perform any logout logic here, e.g., clear local storage, remove tokens, etc.
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // xóa thông tin người dùng khi logout
  },
  // You can add more authentication-related functions if needed, e.g., check if the user is authenticated, get the current user, etc.
  isLoggedIn: () => {
    const token = localStorage.getItem('token');
    return !!token; // Nếu token tồn tại, hàm trả về true, ngược lại trả về false
  },
  getUserInfo: () => {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null; //parse thông tin người dùng từ local storage
  }
}

export default authApi;
export const token = localStorage.getItem('token');
