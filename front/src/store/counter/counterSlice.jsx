import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  loaded: 1,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.loaded = 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
      state.loaded = 1;
    },
    decrement: (state) => {
      state.value -= 1;
      state.loaded = 1;
    },
    decrementByAmount: (state, action) => {
      state.value -= action.payload;
      state.loaded = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.loaded = 0;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.value += action.payload;
        state.loaded = 1;
      })
      .addCase(decrementAsync.pending, (state) => {
        state.loaded = 0;
      })
      .addCase(decrementAsync.fulfilled, (state, action) => {
        state.value -= action.payload;
        state.loaded = 1;
      });
  },
});

export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (amount) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  },
);

export const decrementAsync = createAsyncThunk(
  'counter/decrementAsync',
  async (amount) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  },
);

export const { increment, incrementByAmount, decrement, decrementByAmount } =
  counterSlice.actions;

export default counterSlice.reducer;
