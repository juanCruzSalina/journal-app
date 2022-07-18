import React, { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import AuthLayout from '../../layout/AuthLayout'
import { authData } from '../../features/authSlice/authSlice'
import { emailPasswordSignup } from '../../features/authThunks/authThunks'

type FormValues = {
  fullName: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const { status, errorMessage } = useAppSelector(authData)
  const dispatch = useAppDispatch()
  const schemma = yup.object().shape({
    fullName: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup.string().required('Password is required').min(6 ,'Password must be at least 6 characters'),
  })

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    resolver: yupResolver(schemma)
  })

  const checkingAuth = useMemo(() => status === 'checking', [status])

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(emailPasswordSignup({...data}))
  }

  return (
    <AuthLayout title="Sign up into Journal App">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'animate__animated animate__fadeIn animate__faster'}
      >
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <Controller
              control={control}
              name={'fullName'}
              render={({
                field: {name, value, onChange},
                formState: {errors}
              }) => (
                <TextField
                  label="Full Name"
                  type="text"
                  name={name}
                  value={value}
                  onChange={onChange}
                  helperText={errors.fullName?.message}
                  placeholder='John Doe'
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
            <Controller
              control={control}
              name={'email'}
              render={({
                field: {name, value, onChange},
                formState: {errors}
              }) => (
                <TextField
                  label="Email"
                  type="email"
                  name={name}
                  value={value}
                  onChange={onChange}
                  helperText={errors.email?.message}
                  placeholder='email@google.com'
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
                field: {name, value, onChange},
                formState: {errors}
              }) => (
                <TextField
                  label="Password"
                  type="password"
                  name={name}
                  value={value}
                  onChange={onChange}
                  helperText={errors.password?.message}
                  placeholder='Password'
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <Button disabled={checkingAuth} type='submit' variant='contained' fullWidth>
                Sign up
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr: 1}}>Already Signed?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

export default SignupPage