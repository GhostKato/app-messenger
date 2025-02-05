import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesApi, setToken, clearToken, getToken } from "../../config/messagesApi";
import { AxiosError } from 'axios';
import { createUserFormData } from "../../utils/formDataUtils";
import { UpdateUserParams, User, UserFormValues } from "@/types/userTypes";

type AuthResponse = {
  data: {
    accessToken?: string;
    user: User;
  };
}

type AxiosErrorWithResponse = Error & {
  response?: {
    data?: {
      message?: string;
    };
  };
}


export const register = createAsyncThunk<AuthResponse['data'], UserFormValues, { rejectValue: string }>(
  'auth/register',
  async (credentials: UserFormValues, thunkApi) => {
    try {
      await messagesApi.post('/auth/register', credentials);
      const { email, password } = credentials;
      try {
        const loginResponse: AuthResponse = await messagesApi.post('/auth/login', { email, password });
        const { accessToken } = loginResponse.data;

        if (accessToken) {
          setToken(accessToken); 
        }
        return loginResponse.data;
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

export const logIn = createAsyncThunk<AuthResponse['data'], UserFormValues, { rejectValue: string }>(
  'auth/login',
  async (credentials: UserFormValues, thunkAPI) => {
    try {
      const { data }: AuthResponse = await messagesApi.post('auth/login', credentials);
      const { accessToken } = data;

      if (accessToken) {
        setToken(accessToken);
      }
      return data;
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

export const refreshUser = createAsyncThunk<AuthResponse['data'], void, { rejectValue: string }>(
  'auth/refresh',
  async (_, thunkAPI) => {
    const savedToken = getToken();
    if (!savedToken) {
      return thunkAPI.rejectWithValue('Token is not exist!');
    }
    try {
      const { data }: AuthResponse = await messagesApi.post('auth/refresh');
      const { accessToken } = data;

      if (accessToken) {
        setToken(accessToken); 
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

export const updateUser = createAsyncThunk<User, UpdateUserParams, { rejectValue: string }>(
  'user/updateUser',
  async ({ id, body }: UpdateUserParams, thunkAPI) => {
    try {
      const formData = createUserFormData(body);
      const { data } = await messagesApi.patch(`user/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Сталася невідома помилка');
    }
  }
);
