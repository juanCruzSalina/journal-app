import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { emailPasswordSignup, emailPasswordLogin, googleSignin, logout } from "../authThunks/authThunks";

export type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthSliceState {
  activeUser: User;
  status: 'checking' | 'non-authenticated' | 'authenticated';
  errorMessage: string | null
}

const initialState: AuthSliceState = {
  activeUser: {
    uid: '',
    displayName: null,
    email: null,
    photoURL: null
  },
  status: 'checking',
  errorMessage: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLocalUser: (state, action: PayloadAction<User>) => {
      state.status = 'authenticated';
      state.activeUser.uid = action.payload.uid;
      state.activeUser.displayName = action.payload.displayName;
      state.activeUser.email = action.payload.email
      state.activeUser.photoURL = action.payload.photoURL
    },
    removeLocalUser: (state) => {
      state.status = 'non-authenticated';
      state.activeUser.uid = '';
      state.activeUser.displayName = null;
      state.activeUser.email = null;
      state.activeUser.photoURL = null;
    },
  },
  extraReducers(builder) {

    // Google sign in
    builder.addCase(googleSignin.pending, (state) => {
      state.status = 'checking'
    })
    builder.addCase(googleSignin.fulfilled, (state, { payload }) => {
      state.status = 'authenticated'
      state.activeUser = payload as User
      state.errorMessage = null
    })
    builder.addCase(googleSignin.rejected, (state, { payload }) => {
      state.status = 'non-authenticated'
      if(payload) {
        state.errorMessage = payload.message
      }
    })

    // Email/Password sign up
    builder.addCase(emailPasswordSignup.pending, (state) => {
      state.status = 'checking'
    })
    builder.addCase(emailPasswordSignup.fulfilled, (state, { payload }) => {
      state.status = 'authenticated'
      state.activeUser = payload as User
      state.errorMessage = null
    })
    builder.addCase(emailPasswordSignup.rejected, (state, { payload }) => {
      state.status = 'non-authenticated'
      if(payload) {
        state.errorMessage = payload.message
      }
    })

    // Email/Password login
    builder.addCase(emailPasswordLogin.pending, (state) => {
      state.status = 'checking'
    })
    builder.addCase(emailPasswordLogin.fulfilled, (state, { payload }) => {
      state.status = 'authenticated'
      state.activeUser = payload as User
      state.errorMessage = null
    })
    builder.addCase(emailPasswordLogin.rejected, (state, { payload }) => {
      state.status = 'non-authenticated'
      if(payload) {
        state.errorMessage = payload.message
      }
    })

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.status = 'non-authenticated'
      state.activeUser.uid = '';
      state.activeUser.displayName = null;
      state.activeUser.email = null;
      state.activeUser.photoURL = null;
    })
  },
})

export const { setLocalUser, removeLocalUser } = authSlice.actions

export const authData = (state: RootState) => state.auth

export default authSlice.reducer