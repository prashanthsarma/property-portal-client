import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from '../features/login/slice';

export const store = configureStore({
  reducer: {
    auth: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
