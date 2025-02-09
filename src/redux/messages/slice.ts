import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addMessages, deleteMessages, fetchMessages, updateMessages } from './operations';
import { logOut } from '../auth/operations';
import { MessageType } from "@/types/messageTypes"; 

type MessagesState = {
  messages: MessageType[]; 
  isLoading: boolean;
  isError: boolean;
}

const initialState: MessagesState = {
  messages: [], 
  isLoading: false,
  isError: false,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.messages = action.payload; 
        } else {
          state.messages = [];
        }
      })
      .addCase(addMessages.fulfilled, (state, action) => {
        const payload: MessageType = action.payload; 
        state.messages.push(payload);  
      })
      .addCase(updateMessages.fulfilled, (state, action) => {
        const payload: MessageType = action.payload; 
        const index = state.messages.findIndex(message => message._id === payload._id);
        if (index !== -1) {
          state.messages[index] = payload; 
        }
      })
      .addCase(deleteMessages.fulfilled, (state, action) => {
        const id: string = action.payload; 
        state.messages = state.messages.filter(message => message._id !== id);
      })
      .addCase(logOut.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(fetchMessages.pending, deleteMessages.pending, addMessages.pending, updateMessages.pending),
        state => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(fetchMessages.rejected, deleteMessages.rejected, addMessages.rejected, updateMessages.rejected),
        state => {
          state.isLoading = false;
          state.isError = true;
        }
      )
      .addMatcher(
        isAnyOf(fetchMessages.fulfilled, deleteMessages.fulfilled, addMessages.fulfilled, updateMessages.fulfilled),
        state => {
          state.isLoading = false;
          state.isError = false;
        }
      );
  },
});

export const messagesReducer = messagesSlice.reducer;
