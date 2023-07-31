/* eslint-disable no-lone-blocks */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React, { Component, Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import Dashboard from './views/dashboard/Dashboard'
import AdminAccount from './views/accounts/admins/AdminAccounts'
import authApi from './api/authApi'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () =>
  {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track the user's login status

    // Function to handle successful login
  const handleLoginSuccess = () => {
    // Perform your login logic here
    // For example, you can set a token or user information in local storage upon successful login
    // Then set isLoggedIn to true
    setIsLoggedIn(true);
  };
  //    // Kiểm tra xem người dùng đã đăng nhập hay chưa
  // const isLoggedIn = authApi.isLoggedIn();

  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  // if (!isLoggedIn) {
  //   return <Redirect to="/login" />;
  // }
    // Use state to track the user's login status
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  //handleLogin: đc sd để cập nhật trạng thái đăng nhập của người dùng.
  //Hàm handleLogin được truyền xuống file Login.js qua props để được gọi khi người dùng nhấn nút đăng nhập.

  // Function to handle successful login
  // const handleLoginSucess = () => {
  //   // Perform your login logic here
  //   // For example, you can set a token or user information in local storage upon successful login
  //   // Then set isLoggedIn to true
  //   setIsLoggedIn(true);
  // };
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login onLoginSuccess={handleLoginSuccess}/>} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            {/* <Route exact path="/" name="Login Page" element={<Login />} />
            <Route path="*" element={<DefaultLayout />} /> */}
            {isLoggedIn ? (
            // Render the DefaultLayout if the user is logged in
            <Route path="/*" element={<DefaultLayout />} />
          ) : (
            // Redirect to login page if not logged in
            <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess}/>} />
          )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }


export default App
