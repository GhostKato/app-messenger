import { createAsyncThunk } from '@reduxjs/toolkit';
import { messagesApi } from '../../config/messagesApi';


interface Message {
  id: number;
  name: string;  
}

interface AddMessageRequest {
  name: string; 
}

interface UpdateMessageRequest {
  id: number;
  body: {
    name: string;    
  };
}

interface AddMessageResponse {
  id: number;
  name: string;  
}

interface UpdateMessageResponse {
  id: number;
  name: string;  
}

export const fetchMessages = createAsyncThunk<Message[], void, { rejectValue: string }>(
  'message/fetchMessages', 
  async (_, thunkAPI) => {
    try {
      const { data } = await messagesApi.get('message');
      return data;
    } catch (error: unknown) {
      
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  }
);


export const addMessages = createAsyncThunk<AddMessageResponse, AddMessageRequest, { rejectValue: string }>(
  'message/addMessage', 
  async (body, thunkAPI) => {
    try {
      const { data } = await messagesApi.post('message', body);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  }
);


export const updateMessages = createAsyncThunk<UpdateMessageResponse, UpdateMessageRequest, { rejectValue: string }>(
  'message/updateMessage',
  async ({ id, body }, thunkAPI) => {
    try {
      const { data } = await messagesApi.patch(`message/${id}`, body);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  }
);


export const deleteMessages = createAsyncThunk<number, number, { rejectValue: string }>(
  'messages/deleteMessage',
  async (id, thunkAPI) => {
    try {
      await messagesApi.delete(`message/${id}`);
      return id;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  }
);
