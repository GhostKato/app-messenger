import { createAsyncThunk } from '@reduxjs/toolkit';
import { messagesApi } from '../../config/messagesApi';

export const fetchMessages = createAsyncThunk(
  'message/fetchMessages', 
  async (toId: string, thunkAPI) => {  
    try {
      const { data } = await messagesApi.get(`message/${toId}`);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  }
);

export const addMessages = createAsyncThunk(
  'message/addMessage',
  async (body, thunkAPI) => {
    try {
      const { data } = await messagesApi.post('message', body);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  }
);

export const updateMessages = createAsyncThunk(
  'message/updateMessage',
  async ({ _id, body }, thunkAPI) => {
    try {
      const { data } = await messagesApi.patch(`message/${_id}`, body);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  }
);

export const deleteMessages = createAsyncThunk(
  'messages/deleteMessage',
  async (id, thunkAPI) => {
    try {
      await messagesApi.delete(`message/${id}`);
      return id;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  }
);
