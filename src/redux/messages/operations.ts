import { createAsyncThunk } from '@reduxjs/toolkit';
import { messagesApi } from '../../config/messagesApi';


type Message = {
  _id: string;
  message: string;
  from: string;
  to: string;
  createdAt: string;
  updatedAt: string; 
}

type AddMessageRequest = {
  message: string; 
}

type UpdateMessageRequest = {
  _id: string;
  body: {
    message: string;    
  };
}

type AddMessageResponse = {
  _id: string;
  message: string;  
}

type UpdateMessageResponse = {
  _id: string;
  message: string;  
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
