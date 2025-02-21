import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { deleteNotifications, getMessages, getNotifications } from './operations';
import { logOut } from '../auth/operations';
import { MessageType } from "@/types/messageTypes";
import { NotificationType } from "@/types/notificationTypes"; 

type MessagesState = {
  messages: MessageType[];
  notification: NotificationType[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: MessagesState = {
  messages: [],
  notification: [],
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
    addNotificationWS: (state, action) => {
      state.notification.push(action.payload);
    },
    deleteNotificationWS: (state, action) => {
    state.notification = state.notification.filter(ntf => ntf.messageId !== action.payload);
    },
    },
  extraReducers: builder => {
    builder
      .addCase(getMessages.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.messages = action.payload;
        } else {
          state.messages = [];
        }
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
              state.notification = action.payload.data;              
      })
      .addCase(deleteNotifications.fulfilled, (state, action) => {  
       state.notification = state.notification.filter(ntf => 
      !action.payload.includes(ntf._id) 
       );
       })
      .addCase(logOut.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(getMessages.pending, getNotifications.pending),
        state => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(getMessages.rejected, getNotifications.rejected),
        state => {
          state.isLoading = false;
          state.isError = true;
        }
      )
      .addMatcher(
        isAnyOf(getMessages.fulfilled, getNotifications.fulfilled),
        state => {
          state.isLoading = false;
          state.isError = false;
        }
      );
  },
});

export const { addMessageWS, updateMessageWS, deleteMessageWS, addNotificationWS, deleteNotificationWS } = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
