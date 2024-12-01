// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import chatsReducer from "./slice/chatsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chats: chatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
