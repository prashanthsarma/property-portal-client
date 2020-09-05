import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../../app/store';
import { API } from '../../../api';
import { SignInStatus, LoginState, ISignInData } from './interfaces';


const initialState: LoginState = {
  currentUser: null,
  signInError: '',
  signInStatus: SignInStatus.SignedOut
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (loginData: ISignInData, thunkAPI) => {
    const response = await API.auth.SignIn(loginData)
    return response;
  }
)

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (loginData: ISignInData, thunkAPI) => {
    const response = await API.auth.SignUp(loginData)
    return response;
  }
)

export const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateLoginData: (state, action: PayloadAction<ISignInData>) => {

      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      return state;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.signInStatus = SignInStatus.TryingSignIn;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const { data, error } = action.payload;
        if (error === '') {
          state.currentUser = data;
          state.signInStatus = SignInStatus.SignedIn;
        } else {
          state.signInError = error;
        }
      });
      builder.addCase(signUp.pending, (state, action) => {
        state.signInStatus = SignInStatus.TryingSignIn;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const { data, error } = action.payload;
        if (error === '') {
          state.currentUser = data;
          state.signInStatus = SignInStatus.SignedIn;
        } else {
          state.signInError = error;
        }
      })
  }
});

export const { updateLoginData } = loginSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const signInAsync = async (loginData: ILoginData): AppThunk => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };



// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.login.value)`
export const selectSignInStatus = (state: RootState) => state.auth.signInStatus;
export const selectSignInError = (state: RootState) => state.auth.signInError;

export default loginSlice.reducer;
