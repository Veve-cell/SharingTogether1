/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import Dashboard from 'src/views/dashboard/Dashboard'

const DefaultLayout = ({children}) => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          {/* {children}
          <Dashboard /> */}
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
