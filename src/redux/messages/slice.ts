import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addMessages, deleteMessages, fetchMessages, updateMessages } from './operations';
import { logOut } from '../auth/operations';

type Message = {
  _id: string;
  message: string;
  from: string;
  to: string;
  createdAt: string;
  updatedAt: string; 
}

type FetchMessagesResponse = {
  data: Message[]; 
}

type AddMessageResponse = {
  data: Message; 
}

type UpdateMessageResponse = {
  message: Message; 
}

type MessagesState = {
  messages: Message[];
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
        
        const payload = action.payload as unknown as FetchMessagesResponse;
        state.messages = payload.data || [];
      })
      .addCase(addMessages.fulfilled, (state, action) => {
        
        const payload = action.payload as unknown as AddMessageResponse;
        state.messages.push(payload.data); 
      })
      .addCase(updateMessages.fulfilled, (state, action) => {
        
        const payload = action.payload as unknown as UpdateMessageResponse;
        const index = state.messages.findIndex(message => message._id === payload.message._id);
        if (index !== -1) {
          state.messages[index] = payload.message; 
        }
      })
      .addCase(deleteMessages.fulfilled, (state, action) => {
        const id = action.payload as string | number; 
        state.messages = state.messages.filter(message => message._id !== id.toString()); 
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
