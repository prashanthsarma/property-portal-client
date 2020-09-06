import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from '../reducers/login';
import propertyReducer from '../reducers/property';

export const store = configureStore({
  reducer: {
    auth: loginReducer,
    property: propertyReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
