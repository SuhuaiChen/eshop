import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

import React from 'react'

const AdminRout = () => {
    const {userInfo} = useSelector(state=>state.auth);

  return userInfo && userInfo.isAdmin ? <Outlet/> : <Navigate to='/login' replace/>
}

export default AdminRout