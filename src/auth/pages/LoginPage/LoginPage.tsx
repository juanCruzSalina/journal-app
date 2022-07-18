import React, { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { emailPasswordLogin, googleSignin } from '../../features/authThunks/authThunks'
import AuthLayout from '../../layout/AuthLayout'
import { authData } from '../../features/authSlice/authSlice'

type FormValues = {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { status, errorMessage } = useAppSelector(authData)
  const dispatch = useAppDispatch()

  const schema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Email is required'),
    password: yup.string().required('Password is required')
  })

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const checkingAuth = useMemo(() => status === 'checking', [status])

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(emailPasswordLogin({...data}))
  }

  const onGoogleSignIn = () => {
    dispatch(googleSignin())
  }

  return (
    <AuthLayout title="Login into Journal App">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'animate__animated animate__fadeIn animate__faster'}
      >
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <Controller
              control={control}
              name={'email'}
              render={({
                field: {name, onChange, value},
                formState: {errors}
              }) => (
                <TextField
                  autoComplete='off'
                  label="Email"
                  type="email"
                  placeholder='email@google.com'
                  name={name}
                  value={value}
                  helperText={errors.email?.message}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
            <Controller
              control={control}
              name={'password'}
              render={({
                field: {name, onChange, value},
                formState: {errors}
              }) => (
                <TextField
                  label="Password"
                  type="password"
                  placeholder='password'
                  name={name}
                  value={value}
                  helperText={errors.password?.message}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{
            mt: 2,
            display: (!!errorMessage) ? '' : 'none'
          }}>
            <Alert severity='error'>
              {errorMessage}
            </Alert>
          </Grid>
          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            <Grid item xs={12} sm={6}>
              <Button disabled={checkingAuth} type='submit' variant='contained' fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button disabled={checkingAuth} variant='contained' fullWidth onClick={onGoogleSignIn}>
                <Google />
                <Typography sx={{ml: 1}}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to="/auth/signup">
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

export default LoginPage