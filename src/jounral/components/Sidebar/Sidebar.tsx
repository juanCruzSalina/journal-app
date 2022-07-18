import React from 'react'
import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { useAppSelector } from '../../../app/hooks'
import { journalData } from '../../features/journalSlice/journalSlice'
import NoteItem from '../NoteItem/NoteItem'
import { authData } from '../../../auth/features/authSlice/authSlice'
import { useForm } from 'react-hook-form'

interface SidebarProps {
  drawerWidth: number
}

const Sidebar: React.FC<SidebarProps> = ({drawerWidth = 240}) => {
  const { activeUser } = useAppSelector(authData)
  const { notes } = useAppSelector(journalData)

  return (
    <Box
      component='nav'
      sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
    >
      <Drawer
        variant='permanent' // temporary
        open
        sx={{
          display: {xs: 'block'},
          '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            { activeUser.displayName }
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map(note => <NoteItem key={note.id} {...note}/>)}
        </List>
      </Drawer>
    </Box>
  )
}

export default Sidebar