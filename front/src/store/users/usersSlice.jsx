import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../api/axios';

const initialState = {
  users: [],
  loaded: 1,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loaded = 0;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loaded = 1;
      });
  },
});

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (token, thunkAPI) => {
    try {
      const response = await axiosPrivate.get('/users/getUsers', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data.users;
    } catch (e) {
      if (!e?.response) {
        return thunkAPI.rejectWithValue({ error: 'Le serveur ne réponds pas' });
      } else if (e.response.data.error) {
        return thunkAPI.rejectWithValue({ error: e.response.data.error });
      } else {
        return thunkAPI.rejectWithValue({
          error: e.response.request.statusText,
        });
      }
    }
  },
);

export default usersSlice.reducer;
