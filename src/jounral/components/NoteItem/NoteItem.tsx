import React, { useMemo } from 'react'
import { NoteType, setActive } from '../../features/journalSlice/journalSlice'
import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useAppDispatch } from '../../../app/hooks'

const NoteItem: React.FC<NoteType> = (props) => {
  const dispatch = useAppDispatch()

  const handleCut = (text: string) => {
    const newText = useMemo(() =>{
      return text.length > 17
        ? text.substring(0,17) + '...'
        : text
    }
    , [text])
    return newText
  }

  const handleSelect = () => {
    dispatch(setActive({...props}))
  }
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleSelect} >
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={handleCut(props.title)} />
          <ListItemText secondary={handleCut(props.body)} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}

export default NoteItem