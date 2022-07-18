import React from 'react'
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { useAppDispatch } from '../../../app/hooks'
import { logout } from '../../../auth/features/authThunks/authThunks'
import { clearState } from '../../features/journalSlice/journalSlice'

interface NavbarProps {
  drawerWidth: number
}

const Navbar: React.FC<NavbarProps> = ({ drawerWidth = 240 }) => {

  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(clearState())
    dispatch(logout())
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        width: {sm: `calc(100% - ${ drawerWidth }px)`},
        ml: {sm: `${ drawerWidth }px`}
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          edge="start"
          sx={{mr: 2, display: {sm: 'none'}}}
        >
          <MenuOutlined />
        </IconButton>
        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6' noWrap component='div'> Journal App </Typography>
          <IconButton color='error' onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar