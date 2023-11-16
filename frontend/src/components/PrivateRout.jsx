import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

import React from 'react'

const PrivateRout = () => {
    const {userInfo} = useSelector(state=>state.auth);

  return userInfo? <Outlet/> : <Navigate to='/login' replace/>
}

export default PrivateRout