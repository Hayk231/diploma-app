import { configureStore } from '@reduxjs/toolkit';
import userActions from './User/userActions';

export default configureStore({
  reducer: {
      user: userActions
  }
})