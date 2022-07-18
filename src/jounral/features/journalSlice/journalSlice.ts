import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { createNote, deleteNote, getNotes, updateNote, uploadImages } from "../journalThunks/journalThunks";

export type NoteType = {
  id: string
  title: string
  body: string
  date: number
  imageURLs: string[]
}

interface AuthSlice {
  isLoading: boolean;
  savedMessage: string;
  errorMessage: string;
  activeNote: NoteType | null;
  notes: NoteType[];
}

const initialState: AuthSlice = {
  isLoading: false,
  savedMessage: '',
  errorMessage: '',
  activeNote: null,
  notes: []
}

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setActive: (state, { payload }: PayloadAction<NoteType>) => {
      state.activeNote = payload
      state.savedMessage = ''
    },
    clearState: (state) => {
      state.isLoading = false;
      state.savedMessage = '';
      state.errorMessage = '';
      state.activeNote = null;
      state.notes = [];
    }
  },
  extraReducers: (builder) => {
    //Create note
    builder.addCase(createNote.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(createNote.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.notes.push(payload);
      state.activeNote = payload;
      state.savedMessage = 'Note created!'
    })
    builder.addCase(createNote.rejected, (state, { payload }) => {
      state.isLoading = false;
      if(payload) {
        state.errorMessage = payload.message
      };
    })

    // Get notes from firebase
    builder.addCase(getNotes.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getNotes.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.notes = payload;
    })
    builder.addCase(getNotes.rejected, (state, { payload }) => {
      state.isLoading = false;
      if(payload) {
        state.errorMessage = payload.message
      };
    })

    // Update note
    builder.addCase(updateNote.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(updateNote.fulfilled,(state, { payload }) => {
      state.isLoading = false;
      state.notes = state.notes.map(note => {
        if (note.id === payload.id) {
          return payload
        }
        return note
      });
      state.savedMessage = 'Note updated!'
    })
    builder.addCase(updateNote.rejected, (state, { payload }) => {
      state.isLoading = false;
      if(payload) {
        state.errorMessage = payload.message
      };
    })

    // Upload Images
    builder.addCase(uploadImages.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(uploadImages.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.activeNote!.imageURLs = [...state.activeNote!.imageURLs, ...payload ]
    })
    builder.addCase(uploadImages.rejected, (state, { payload }) => {
      state.isLoading = false;
      if(payload) {
        state.errorMessage = payload.message
      };
    })

    // Delete note
    builder.addCase(deleteNote.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteNote.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.activeNote = null
      state.notes = state.notes.filter(note => note.id !== payload)
    })
    builder.addCase(deleteNote.rejected, (state, { payload }) => {
      state.isLoading = false;
      if(payload) {
        state.errorMessage = payload.message
      };
    })
  }
})

export const { setActive, clearState } = journalSlice.actions
export const journalData = (state: RootState) => state.journal
export default journalSlice.reducer