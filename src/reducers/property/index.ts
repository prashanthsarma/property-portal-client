import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { API } from '../../api';
import { PropertyState } from './interfaces';
import { IPropertyAttrs } from '@prashanthsarma/property-portal-common';


const initialState: PropertyState = {
  listings: [],
  listingsError: '',
  loadingListings: false,
};

export const fetchPropertyListings = createAsyncThunk(
  'property/fetchPropertyListings',
  async (_, thunkAPI) => {
    const response = await API.property.fetchPropertyListings();
    return response;
  }
)

export const fetchUserPropertyListings = createAsyncThunk(
  'property/fetchUserPropertyListings',
  async (_, thunkAPI) => {
    const response = await API.property.fetchUserPropertyListings();
    return response;
  }
)

export const removeUserPropertyListings = createAsyncThunk(
  'property/removeUserPropertyListings',
  async (id: string, thunkAPI) => {
    const response = await API.property.removeUserPropertyListings(id);
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
      .addCase(fetchPropertyListings.pending, (state, action) => {
        state.loadingListings = true;
        state.listings = [];
      })
      .addCase(fetchPropertyListings.fulfilled, (state, action) => {
        const { data, error } = action.payload;
        if (error === '') {
          state.listings = data.listing;
          state.loadingListings = false;
        } else {
          state.listingsError = error;
        }
      })
      .addCase(fetchUserPropertyListings.pending, (state, action) => {
        state.loadingListings = true;
        state.listings = [];
      })
      .addCase(fetchUserPropertyListings.fulfilled, (state, action) => {
        const { data, error } = action.payload;
        if (error === '') {
          state.listings = data.listing;
          state.loadingListings = false;
        } else {
          state.listingsError = error;
        }
      })
      .addCase(removeUserPropertyListings.fulfilled, (state, action) => {
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
