import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatsState {
  selectedChat: any;
  userChats: any[];
}

const initialState: ChatsState = {
  selectedChat: null,
  userChats: [],
};

const chatsSlice = createSlice({
  
  name: 'chats',
  initialState,
  reducers: {
    setSelectedChat: (state, action: PayloadAction<any>) => {
      state.selectedChat = action.payload;
    },
    setUserChats: (state, action: PayloadAction<any[]>) => {
      state.userChats = action.payload;
    },
  },
});

export const { setSelectedChat, setUserChats } = chatsSlice.actions;

export default chatsSlice.reducer;
