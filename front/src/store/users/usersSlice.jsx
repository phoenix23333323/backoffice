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
        state.users = action.payload.data;
        state.loaded = 1;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loaded = 0;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user.id !== action.payload.data.id,
        );
        state.loaded = 1;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loaded = 1;
      })
      .addCase(updateUser.pending, (state) => {
        state.loaded = 0;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user.id !== action.payload.data.id,
        );
        state.users = state.users.concat(action.payload.data);
        state.loaded = 1;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loaded = 1;
      });
  },
});

export const getUsers = createAsyncThunk('users/getUsers', async (token) => {
  try {
    const response = await axiosPrivate.get('/users/getUsers', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return {
      data: response.data.users,
      message: response.data.message,
    };
  } catch (e) {
    console.log(e);
  }
});

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.put(
        '/users/updateUser/' + data.id,
        data.data,
        {
          headers: {
            authorization: `Bearer ${data.token}`,
          },
        },
      );
      return {
        data: response.data.user[0],
        message: response.data.message,
      };
    } catch (e) {
      return rejectWithValue(e.response.data.error);
    }
  },
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.put('/users/deleteUser/' + data.id, {
        headers: {
          authorization: `Bearer ${data.token}`,
        },
      });
      return {
        data: response.data.user[0],
        message: response.data.message,
      };
    } catch (e) {
      return rejectWithValue(e.response.data.error);
    }
  },
);

export default usersSlice.reducer;
