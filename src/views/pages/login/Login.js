/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import authApi from 'src/api/authApi'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useState } from 'react'


const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  //handleLogin được sử dụng để thực hiện logic đăng nhập.

  const handleLogin = async () => {
    // Perform your login logic here, e.g., communicate with the server to validate credentials
    // For simplicity, let's assume the login is successful if the username and password are not empty

    if (email && password) {
      // Update the user's authentication status (e.g., set a token or user info in local storage)
      // Then call the onLoginSuccess function to update the login status in the App component

      try {
        await authApi.login(email, password);
        // Navigate to the default layout or any other protected page
        //navigate('/Home'); // You can redirect to the desired protected page after login
        onLoginSuccess(); // Call the onLoginSuccess function to update isLoggedIn state in App.js
      } catch (error) {
        // Handle the error if the import fails
        alert(error.message);
      };
    } else {
      // Handle login failure (e.g., show an error message)
      alert('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-container min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4 card-login">
                <CCardBody>
                  <CForm>
                    <h1 className='admin-login-heading'>ADMIN LOGIN</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4 login-button" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white login-container py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center ">
                  <div>
                    <h2 className='admin-welcome-heading'>Welcome back</h2>
                    <img src={require('../../../assets/images/ad1.png').default} alt="Welcome Image" />
                    {/* <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
