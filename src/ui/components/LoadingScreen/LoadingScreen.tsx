import React from 'react'
import { CircularProgress, Grid, Typography } from '@mui/material'

const LoadingScreen: React.FC = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        padding: 4
      }}
    >
      <Grid
        container
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <CircularProgress color='warning' />
        <Typography color={'white'} variant='h5' sx={{
          mt: 2
        }}>Loading into Journal App</Typography>
      </Grid>
    </Grid>
  )
}

export default LoadingScreen