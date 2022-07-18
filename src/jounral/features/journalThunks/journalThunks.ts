import { AppDispatch, RootState } from "../../../app/store"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore/lite"
import { firestore } from "../../../firebase/config"
import { NoteType } from "../journalSlice/journalSlice"
import { FirebaseError } from "firebase/app"
import { fileUploader } from "../../../helper/fileUploader"

type ErrorType = {
  message: string
}

interface thunkAPI {
  dispatch: AppDispatch,
  state: RootState,
  rejectValue: ErrorType
}

export const createNote = createAsyncThunk<NoteType, void, thunkAPI>(
  'journal/newNote',
  async (_, { getState, rejectWithValue }) => {
    const { uid } = getState().auth.activeUser
    const newNote: NoteType = {
      id: '',
      title: '',
      body: '',
      date: new Date().getTime(),
      imageURLs: []
    }
    try {
      const newDoc = doc(collection(firestore, `${uid}/journal/notes`))
      await setDoc(newDoc, newNote)
      newNote.id = newDoc.id
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue({ message: error.message })
      }
    }
    return newNote as NoteType
  }
)

export const getNotes = createAsyncThunk<NoteType[], void, thunkAPI>(
  'journal/getNotes',
  async (_, { rejectWithValue, getState }) => {
    const notes: NoteType[] = []
    try {
      const { uid } = getState().auth.activeUser
      const collectionRef = collection(firestore, `${uid}/journal/notes`)
      const docs = await getDocs(collectionRef)
      docs.forEach( doc => {
        const { title, body, imageURLs, date } = doc.data()
        notes.push({id: doc.id, title, body, imageURLs, date })
      })
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue({ message: error.message })
      }
    }
    return notes
  }
)

export const updateNote = createAsyncThunk<NoteType, NoteType, thunkAPI>(
  'journal/updateNote',
  async (note, { rejectWithValue, getState }) => {
    const { uid } = getState().auth.activeUser
    const { imageURLs } = getState().journal.activeNote!
    const {id, imageURLs: oldImages ,...rest } = note
    try {
      const docRef = doc(firestore, `${uid}/journal/notes/${id}`)
      await setDoc(docRef, { rest, imageURLs }, { merge: true })
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue({ message: error.message })
      }
    }
    return note
  }
)

export const uploadImages = createAsyncThunk<string[], FileList, thunkAPI>(
  'journal/addingImages',
  async (files) => {
    const fileUploadsPromises = []
    for (const file of files) {
      fileUploadsPromises.push(fileUploader(file))
    }
    const photoURLs = await Promise.all(fileUploadsPromises)
    return photoURLs
  }
)

export const deleteNote = createAsyncThunk<string, void, thunkAPI>(
  'journal/deleteNote',
 async (_, { getState, rejectWithValue }) => {
    const { uid } = getState().auth.activeUser
    const { id } = getState().journal.activeNote!
    try {
      const docRef = doc(firestore, `${uid}/journal/notes/${id}`)
      await deleteDoc( docRef )
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue({ message: error.message })
      }
    }
    return id
  }
)