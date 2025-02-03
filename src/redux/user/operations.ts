import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesApi } from "../../config/messagesApi";

interface FetchUsersResponse {
  data: Users[]; 
}

interface Users {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;  
}

export const fetchUsers = createAsyncThunk<FetchUsersResponse, void, { rejectValue: string }>(
  'user/fetchUsers', 
  async (_, thunkAPI) => {
    try {
      const { data } = await messagesApi.get('user/all');
      return data;
    } catch (error: unknown) {
      
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  }
);


