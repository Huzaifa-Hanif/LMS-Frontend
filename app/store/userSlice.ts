// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: any; // Adjust the type based on your user structure
  loading: boolean;
  hasPassword: boolean;
}

const initialState: UserState = {
  user: null,
  loading: true, // Set to true initially
  hasPassword: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInUserData(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.loading = false;
    },
    clearUserData(state) {
      state.user = null;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setHasPassword(state, action: PayloadAction<boolean>) {
      state.hasPassword = action.payload;
    },
  },
});

export const {
  setLoggedInUserData,
  clearUserData,
  setLoading,
  setHasPassword,
} = userSlice.actions;
export default userSlice.reducer;
