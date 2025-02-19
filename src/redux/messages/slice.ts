import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchMessages } from './operations';
import { logOut } from '../auth/operations';
import { MessageType } from "@/types/messageTypes"; 

type MessagesState = {
  messages: MessageType[];
  newMessages: MessageType[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: MessagesState = {
  messages: [],
  newMessages: [],
  isLoading: false,
  isError: false,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {    
    addMessageWS: (state, action) => {
      const newMessage: MessageType = action.payload;
      state.messages.push(newMessage);
    },
    updateMessageWS: (state, action) => {
      const updatedMessage: MessageType = action.payload;
      const index = state.messages.findIndex(message => message._id === updatedMessage._id);
      if (index !== -1) {
        state.messages[index] = updatedMessage;
      }
    },
    deleteMessageWS: (state, action) => {
      const id: string = action.payload;
      state.messages = state.messages.filter(message => message._id !== id);
    },   
    fetchMessagesWS: (state, action) => {
      const allMessages: MessageType[] = action.payload;
      state.messages = allMessages;
    },
    addNotificationWS: (state, action) => {
      state.newMessages.push(action.payload);
    },
    deleteNotificationWS: (state, action) => {
      state.newMessages = state.newMessages.filter(msg => msg.fromId !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.messages = action.payload;
        } else {
          state.messages = [];
        }
      })             
      .addCase(logOut.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(fetchMessages.pending),
        state => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(fetchMessages.rejected),
        state => {
          state.isLoading = false;
          state.isError = true;
        }
      )
      .addMatcher(
        isAnyOf(fetchMessages.fulfilled),
        state => {
          state.isLoading = false;
          state.isError = false;
        }
      );
  },
});

export const { addMessageWS, updateMessageWS, deleteMessageWS, addNotificationWS, deleteNotificationWS } = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
