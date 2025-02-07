import { createAsyncThunk } from '@reduxjs/toolkit';
import { messagesApi } from '../../config/messagesApi';
import { MessageType } from "@/types/messageTypes";


type AddMessagePayload = {
  message: string;
  fromId: string;
  toId: string;
}

type UpdateMessagePayload = {
  _id: string;
  body: { message: string };
}

type DeleteMessagePayload = {
  id: string;
}

export const fetchMessages = createAsyncThunk<
  MessageType[], 
  string, 
  { rejectValue: string } 
>(
  'message/fetchMessages', 
  async (toId, thunkAPI) => {  
    try {      
      const { data } = await messagesApi.get(`message/${toId}`);
      return data.data.messages; 
    } catch (error) {      
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  }
);

export const addMessages = createAsyncThunk<
  MessageType, 
  AddMessagePayload, 
  { rejectValue: string } 
>(
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

export const updateMessages = createAsyncThunk<
  MessageType, 
  UpdateMessagePayload, 
  { rejectValue: string } 
>(
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

export const deleteMessages = createAsyncThunk<
  string, 
  DeleteMessagePayload, 
  { rejectValue: string } 
>(
  'messages/deleteMessage',
  async ({ id }, thunkAPI) => {
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
