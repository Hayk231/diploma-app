import { configureStore } from '@reduxjs/toolkit';
import userActions from './User/userActions';
import loadingActions from "./loadingActions";

export default configureStore({
  reducer: {
      user: userActions,
      loading: loadingActions
  }
})