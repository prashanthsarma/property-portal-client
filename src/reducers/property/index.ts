import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { API } from '../../api';
import { PropertyState } from './interfaces';

const initialState: PropertyState = {
  listings: [],
  listingsError: '',
  loadingListings: false,
};

export const fetchAllProperties = createAsyncThunk(
  'property/fetchAllProperties',
  async (_, thunkAPI) => {
    const response = await API.property.fetchAllProperties();
    return response;
  }
)

export const fetchUserProperties = createAsyncThunk(
  'property/fetchUserProperties',
  async (_, thunkAPI) => {
    const response = await API.property.fetchUserProperties();
    return response;
  }
)

export const removeProperty = createAsyncThunk(
  'property/removeProperty',
  async (id: string, thunkAPI) => {
    const response = await API.property.removeProperty(id);
    return response;
  }
)

export const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllProperties.pending, (state, action) => {
        state.loadingListings = true;
        state.listings = [];
      })
      .addCase(fetchAllProperties.fulfilled, (state, action) => {
        const { data, error } = action.payload;
        if (error === '') {
          state.listings = data.listing;
          state.loadingListings = false;
        } else {
          state.listingsError = error;
        }
      })
      .addCase(fetchUserProperties.pending, (state, action) => {
        state.loadingListings = true;
        state.listings = [];
      })
      .addCase(fetchUserProperties.fulfilled, (state, action) => {
        const { data, error } = action.payload;
        if (error === '') {
          state.listings = data.listing;
          state.loadingListings = false;
        } else {
          state.listingsError = error;
        }
      })
      .addCase(removeProperty.fulfilled, (state, action) => {
        const { data, error } = action.payload;
        if (error === '') {
          state.listings = data.listing;
        } else {
          state.listingsError = error;
        }
      })

  }
});

export const selectLoadingListings = (state: RootState) => state.property.loadingListings;
export const selectListings = (state: RootState) => state.property.listings;

export default propertySlice.reducer;
