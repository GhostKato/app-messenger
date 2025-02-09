import { createAsyncThunk } from '@reduxjs/toolkit';
import { messagesApi } from '../../config/messagesApi';
import { MessageType } from "@/types/messageTypes";


type AddMessagePayload = {
  toId: string;
  message: string;
};

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
  async ({ toId, message }, thunkAPI) => {  
    try {
      const { data } = await messagesApi.post(`message/${toId}`, { message });
      
      return data.data;
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
  { messageId: string; message: string }, 
  { rejectValue: string }
>(
  'message/updateMessage',
  async ({ messageId, message }, thunkAPI) => {
    try {
      const response = await messagesApi.patch(`/message/${messageId}`, { message });
      return response.data.updatedMessage; 
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
