import { configureStore } from '@reduxjs/toolkit';
import userActions from './User/userActions';
import loadingActions from "./loadingActions";
import adminActions from "./Admin/adminActions";

export default configureStore({
  reducer: {
      user: userActions,
      admin: adminActions,
      loading: loadingActions
  }
})