import React, { Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import { authData } from '../../../auth/features/authSlice/authSlice'

interface PrivateRoute {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<PrivateRoute> = ({ children }) => {
  const { status } = useAppSelector(authData)
  return (
    <Fragment>
      {
        (status === 'authenticated')
          ? children
          : <Navigate to={'/auth/login'} />
      }
    </Fragment>
  )
}

export default ProtectedRoute