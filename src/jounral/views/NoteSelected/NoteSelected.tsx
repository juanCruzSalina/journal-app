import React, { useEffect, useMemo, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { journalData, NoteType } from '../../features/journalSlice/journalSlice'
import { deleteNote, updateNote, uploadImages } from '../../features/journalThunks/journalThunks'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import ImageGallery from '../../components/ImageGallery/ImageGallery'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

const NoteSelected: React.FC = () => {
  const { activeNote, savedMessage, isLoading } = useAppSelector(journalData)
  const dispatch = useAppDispatch()

  const dateString = useMemo(() => {
    const newDate = new Date(activeNote!.date)
    return newDate.toUTCString()
  }, [activeNote!.date])

  useEffect(() => {
    if (savedMessage.length > 0) {
      Swal.fire('System message', savedMessage, 'success')
    }

  }, [savedMessage])

  const { handleSubmit, control } = useForm({
    defaultValues: activeNote!
  })

  const onHandleSubmit: SubmitHandler<NoteType> = (data) => {
    dispatch(updateNote(data));
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(uploadImages(e.target.files))
    }
    return;
  }

  const handleDelete = () => {
    dispatch(deleteNote())
  }

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb: 1}}>
        <Grid item>
          <Typography fontSize={39} fontWeight='light' >{ dateString }</Typography>
        </Grid>
        <Grid item>
          <input
            type={'file'}
            multiple
            ref={fileInputRef}
            onChange={onFileInputChange}
            style={{display: 'none'}}
          />
          <IconButton
            color='primary'
            disabled={isLoading}
            onClick={() => fileInputRef.current!.click()}
          >
            <UploadOutlined/>
          </IconButton>
          <Button type='submit' disabled={isLoading} color="primary" sx={{padding: 2}}>
            <SaveOutlined sx={{fontSize: 30, mr: 1}} />
            Save
          </Button>
        </Grid>
        <Grid container>
          <Controller
            control={control}
            name={'title'}
            render={({field: { name, onChange, value }}) => (
              <TextField
                name={name}
                value={value}
                onChange={onChange}
                type="text"
                variant="filled"
                fullWidth
                placeholder="Add a title..."
                label="Títle"
                sx={{border: 'none', mb: 1}}
              />
            )}
          />
          <Controller
            control={control}
            name={'body'}
            render={({field: { name, onChange, value }}) => (
              <TextField
                name={name}
                value={value}
                onChange={onChange}
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿What happened today?"
                minRows={5}
              />
            )}
          />
        </Grid>
        <Grid container justifyContent={'end'}>
          <Button
            onClick={handleDelete}
            color={'error'}
            sx={{ mt: 2 }}
          >
            <DeleteOutline />
            Delete
          </Button>
        </Grid>
        <ImageGallery />
      </Grid>
    </form>
  )
}

export default NoteSelected