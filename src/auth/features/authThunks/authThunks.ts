import { createAsyncThunk } from "@reduxjs/toolkit"
import { FirebaseError } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
  User } from "firebase/auth"
import { AppDispatch, RootState } from "../../../app/store"
import { firebaseAuth } from "../../../firebase/config"
import { User as StateUser } from "../authSlice/authSlice"


interface thunkAPI {
  dispatch: AppDispatch,
  state: RootState,
  rejectValue: { message: string }
}

interface SignInData {
  email: string;
  password: string;
  fullName: string;
}

const googleProvider = new GoogleAuthProvider()

export const googleSignin = createAsyncThunk<StateUser | undefined, void, thunkAPI>(
  'auth/googleSignin',
  async (_, { rejectWithValue }) => {
    try {
      const resp = await signInWithPopup(firebaseAuth, googleProvider)
      console.log(resp)
      const { uid, displayName, email, photoURL } = resp.user
      return {
        uid,
        displayName,
        email,
        photoURL
      } as StateUser
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue({message: error.message})
      }
    }
  }
)

export const emailPasswordSignup = createAsyncThunk<StateUser | undefined, SignInData, thunkAPI>(
  'auth/email&passwordSignup',
  async (userData, { rejectWithValue }) => {
    try {
      const { email, password, fullName } = userData
      const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password)
      const { uid, photoURL } = resp.user
      await updateProfile(firebaseAuth.currentUser as User, {displayName: fullName})
      return {
        displayName: fullName,
        uid,
        photoURL,
        email
      } as StateUser
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue({message: error.message})
      }
    }
  }
)

export const emailPasswordLogin = createAsyncThunk<StateUser | undefined, Omit<SignInData, 'fullName'>, thunkAPI>(
  'auth/email&passwordLogin',
  async (userData, { rejectWithValue }) => {
    try {
      const { email, password } = userData
      const resp = await signInWithEmailAndPassword(firebaseAuth, email, password)
      const { displayName, uid, photoURL } = resp.user
      return {
        displayName,
        uid,
        photoURL,
        email
      } as StateUser
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue({message: error.message})
      }
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await signOut(firebaseAuth)
  }
)