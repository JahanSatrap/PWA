import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './core/helpers/axios'
import './assets/styles/desktop-styles.css'
import './assets/styles/mobile-styles.css'

import Login from "./pages/authentication/login"
import SignUp from "./pages/authentication/signup"
import Dashboard from './pages/dashboard'
import BodyBuilding from './pages/bodyBuilding'
import QRCodeScanner from './pages/bodyBuilding/QRCodeScanner'
import ServiceStatus from './pages/bodyBuilding/serviceStatus'


import { useAppDispatch, useAppSelector } from "./redux-toolkit/store/hooks"
import { userValidate } from "./redux-toolkit/features/authentication/authentication-slice"
import { loadClosetFromLocal } from './redux-toolkit/features/bodybuilding/actions'

import {ThreeDots} from 'react-loader-spinner'
import { Toast } from './core/component'
import { isTouchable } from './core/helpers/utils'

function Starter() {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  
  React.useEffect(() => {
    dispatch(userValidate())
    dispatch(loadClosetFromLocal())
  },[dispatch])
  if (isAuthenticated === undefined){
    return (
      <ThreeDots
        visible={true}
        height="40"
        width="40"
        color="white"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{display:'flex',justifyContent:"center"}}
        wrapperClass=""
      />
    )
  }
  return (
        <BrowserRouter>
          <Toast />
          <Routes>
          {isAuthenticated
          ?
            (
                <Route path="/">
                  <Route path="/" element={<Dashboard/>} />
                  <Route path="/bodyBuilding" element={<BodyBuilding/>} />
                  <Route path="/scanner" element={<QRCodeScanner/>} />
                  <Route path="/serviceStatus" element={<ServiceStatus/>} />
                </Route>
            )
          :
            (      
                <Route path="/">
                  <Route path="/" element={<Login />} />
                  <Route path="/singup" element={<SignUp/>}  />
                </Route>
            )
          }
            <Route path="*" element={<div>Not match found</div>} />
          </Routes>
        </BrowserRouter>
  );
}
function App() {
  if (!isTouchable()){
    return <Starter />
  }
  else{
    return <Starter />
  }
}
export default App;
