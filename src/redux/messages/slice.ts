import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addMessages, deleteMessages, fetchMessages, updateMessages } from './operations';
import { logOut } from '../auth/operations';

const initialState = {
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
        if (Array.isArray(action.payload.data)) {
          state.messages = action.payload.data.data;
        } else {
          state.messages = [];
        }
      })
      .addCase(addMessages.fulfilled, (state, action) => {
        const payload = action.payload;
        state.messages.push(payload);  
      })
      .addCase(updateMessages.fulfilled, (state, action) => {
        const payload = action.payload;
        const index = state.messages.findIndex(message => message._id === payload._id);
        if (index !== -1) {
          state.messages[index] = payload;
        }
      })
      .addCase(deleteMessages.fulfilled, (state, action) => {
        const id = action.payload;
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
