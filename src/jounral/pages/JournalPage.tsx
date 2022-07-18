import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import JournalLayout from '../layout/JournalLayout'
import NoSelected from '../views/NoSelected/NoSelected'
import NoteSelected from '../views/NoteSelected/NoteSelected'
import { createNote, getNotes } from '../features/journalThunks/journalThunks'
import { journalData } from '../features/journalSlice/journalSlice'

const JournalPage = () => {
  const { activeNote, isLoading } = useAppSelector(journalData)
  const dispatch = useAppDispatch()
  const handleNewNote = () => {
    dispatch(createNote())
  }

  useEffect(() => {
    dispatch(getNotes())
  }, [])

  return (
    <JournalLayout>
      {
        (!!activeNote)
          ? <NoteSelected/>
          : <NoSelected />
      }
      <IconButton
        disabled={isLoading}
        onClick={handleNewNote}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{fontSize: 30}} />
      </IconButton>
    </JournalLayout>
  )
}

export default JournalPage