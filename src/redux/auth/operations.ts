import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesApi, setToken, clearToken, getToken } from "../../config/messagesApi";
import { AxiosError } from 'axios';
import { createFormData } from "../../utils/formDataUtils";
import { UpdateUserType, UserType, UserFormType } from "@/types/userTypes";

type AuthResponse = {
  data: {
    accessToken?: string;
    user: UserType;
  };
}

type AuthResponseLogin = { 
  data: { 
    data: {
      accessToken?: string;
      user: UserType;
    }
  };
};

type AuthResponseRefresh = {
  data: { 
    data: {
      accessToken?: string;
      user: UserType;
    }
  };
}

type AxiosErrorWithResponse = Error & {
  response?: {
    data?: {
      message?: string;
    };
  };
}


export const register = createAsyncThunk<AuthResponse['data'], UserFormType, { rejectValue: string }>(
  'auth/register',
  async (credentials: UserFormType, thunkApi) => {
    try {
      await messagesApi.post('/auth/register', credentials);
      const { email, password } = credentials;
      try {
        const loginResponse: AuthResponseLogin = await messagesApi.post('/auth/login', { email, password });
        const { accessToken } = loginResponse.data.data;

        if (accessToken) {
          setToken(accessToken);          
        }
        return loginResponse.data.data;
      } catch (loginError: unknown) {
        if ((loginError as AxiosErrorWithResponse).response) {
          return thunkApi.rejectWithValue((loginError as AxiosErrorWithResponse).response?.data?.message || 'Login failed');
        }
        return thunkApi.rejectWithValue('Unexpected error occurred');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkApi.rejectWithValue(err.message);
      }
      return thunkApi.rejectWithValue('Unexpected error occurred');
    }
  }
);


export const logIn = createAsyncThunk<AuthResponse['data'], UserFormType, { rejectValue: string }>(
  'auth/login',
  async (credentials: UserFormType, thunkAPI) => {
    try {
      const { data }: AuthResponseLogin = await messagesApi.post('auth/login', credentials);
      const { accessToken } = data.data;

      if (accessToken) {
        setToken(accessToken);
      }
      return data.data;
    } catch (err: unknown) {
      if ((err as AxiosErrorWithResponse).response) {
        return thunkAPI.rejectWithValue((err as AxiosErrorWithResponse).response?.data?.message || 'Login failed');
      }
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue('Unexpected error occurred');
    }
  }
);


export const logOut = createAsyncThunk<void, void, { rejectValue: string }>('auth/logout', async (_, thunkAPI) => {
  try {
    await messagesApi.post('auth/logout');
    clearToken();
  } catch (err: unknown) {
    if ((err as AxiosErrorWithResponse).response) {
      return thunkAPI.rejectWithValue((err as AxiosErrorWithResponse).response?.data?.message || 'Logout failed');
    }
    if (err instanceof Error) {
      return thunkAPI.rejectWithValue(err.message);
    }
    return thunkAPI.rejectWithValue('Unexpected error occurred');
  }
});


export const refresh = createAsyncThunk<AuthResponseRefresh['data'], void, { rejectValue: string }>(
  'auth/refresh',
  async (_, thunkAPI) => {
    const savedToken = getToken();
    if (!savedToken) {
      return thunkAPI.rejectWithValue('Token is not exist!');
    }
    try {
      const { data }: AuthResponseRefresh = await messagesApi.post('auth/refresh');
      
      const token: string = data.data.accessToken || '';       
      
      if (token) {
        setToken(token); 
      } else {
        return thunkAPI.rejectWithValue('No accessToken in response');
      }
      
      return data;
    } catch (err: unknown) {
      if ((err as AxiosErrorWithResponse).response) {
        return thunkAPI.rejectWithValue((err as AxiosErrorWithResponse).response?.data?.message || 'Refresh failed');
      }
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue('Unexpected error occurred');
    }
  }
);


export const updateUser = createAsyncThunk<UserType, UpdateUserType, { rejectValue: string }>(
  'user/updateUser',
  async ({ id, body }: UpdateUserType, thunkAPI) => {
    try {
      const formData = createFormData(body);
      const { data } = await messagesApi.patch(`user/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });      
      return data.user;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);
