import { createSlice } from "@reduxjs/toolkit";

const FireStore = createSlice({
  name: "fire",
  initialState: { exist: false },
  reducers: {
    UserExists: (state, action) => {
      state.exist = action.payload;
    },
  },
});

export const { UserExists } = FireStore.actions;

export default FireStore.reducer;
