import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesApi } from "../../config/messagesApi";
import { UserType } from "@/types/userTypes";

type GetUsersResponse = {
  data: UserType[]; 
}

export const getUsers = createAsyncThunk<GetUsersResponse, void, { rejectValue: string }>(
  'user/getUsers', 
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


