import React, { useEffect } from 'react'
import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'

interface JournalLayoutProps {
  children: React.ReactNode
}

const JournalLayout: React.FC<JournalLayoutProps> = (props) => {
  const drawerWidth = 240
  return(
    <Box sx={{display: 'flex'}}>
      <Navbar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />
      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  )
}

export default JournalLayout