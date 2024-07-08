import React, { ReactNode } from 'react'
import { getAccessToken } from '../redux/features/auth/authSlice'
import { useAppSelector } from '../redux/hooks'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}:{children:ReactNode}) => {
    const token = useAppSelector(getAccessToken)
    if(!token){
        return <Navigate to="/login" replace={true}></Navigate>
    }
  return children
}

export default ProtectedRoute