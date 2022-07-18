import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from "../auth/features/authSlice/authSlice";
import journalReducer from '../jounral/features/journalSlice/journalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    journal: journalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;