import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter/counterSlice';
import companyReducer from './company/companySlice';
import usersReducer from './users/usersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    company: companyReducer,
    users: usersReducer,
  },
});
