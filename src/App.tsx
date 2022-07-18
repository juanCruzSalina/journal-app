import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { authData, setLocalUser, removeLocalUser, User } from './auth/features/authSlice/authSlice'
import { firebaseAuth } from './firebase/config'
import JournalPage from './jounral/pages/JournalPage'
import LoadingScreen from './ui/components/LoadingScreen/LoadingScreen'
import LoginPage from './auth/pages/LoginPage/LoginPage'
import SignupPage from './auth/pages/SignupPage/SignupPage'
import ProtectedRoute from './ui/components/ProtectedRoute/ProtectedRoute'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(authData)

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) return dispatch(removeLocalUser())
      const {uid, displayName, email, photoURL} = user
      dispatch(setLocalUser({uid, displayName, email, photoURL}))
    })
  }, [])

  if (status === 'checking') {
    return <LoadingScreen />
  }

  return (
    <Routes>
      {
        (status === 'authenticated')
          ? (
            <Route path='/' element={
              <ProtectedRoute>
                <JournalPage />
              </ProtectedRoute>
            }/>)
          : (
            <Route path='auth'>
              <Route path='login' element={<LoginPage />}/>
              <Route path='signup' element={<SignupPage />}/>
            </Route>
          )
      }
      <Route path='/*' element={
        <ProtectedRoute>
          <JournalPage />
        </ProtectedRoute>
      }/>
    </Routes>
  )
}

export default App
