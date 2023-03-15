import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/auth/auth-slice";
import FireStore from "../features/data/FireStore";

export default configureStore({
  reducer: {
    user: userSlice,
    fire: FireStore,
  },
});
