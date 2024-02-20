import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../api/axios';

const initialState = {
  companyId: 0,
  company: {},
  loaded: 1,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyId: (state, action) => {
      state.companyId = action.payload;
      state.loaded = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompany.pending, (state) => {
        state.loaded = 0;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.company = action.payload.data;
        state.loaded = 1;
      })
      .addCase(updateCompany.pending, (state) => {
        state.loaded = 0;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.company = action.payload.data;
        state.loaded = 1;
      });
  },
});

export const getCompany = createAsyncThunk(
  'company/getCompany',
  async (data, thunkAPI) => {
    try {
      const response = await axiosPrivate.get(
        '/company/getCompany/' + data.companyId,
        {
          headers: {
            authorization: `Bearer ${data.token}`,
          },
        },
      );
      return {
        data: response.data.company[0],
        message: "L'entreprise à bien été récupéré",
      };
    } catch (e) {
      console.log(e);
    }
  },
);

export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async (data, thunkAPI) => {
    try {
      const response = await axiosPrivate.put(
        '/company/updateCompany/' + data.companyId,
        data.data,
        {
          headers: {
            authorization: `Bearer ${data.token}`,
          },
        },
      );
      return {
        data: response.data.company[0],
        message: "L'entreprise à bien été mis à jour",
      };
    } catch (e) {
      console.log(e);
    }
  },
);

export const { setCompanyId } = companySlice.actions;

export default companySlice.reducer;
