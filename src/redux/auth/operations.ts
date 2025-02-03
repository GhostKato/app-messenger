import { createAsyncThunk } from "@reduxjs/toolkit";
import { messagesApi, setToken, clearToken, getToken } from "../../config/messagesApi";
import { AxiosError } from 'axios';
import { createUserFormData } from "../../utils/formDataUtils";
import { UserFormDataBody, User } from "@/types/userTypes";

interface AuthResponse {
  data: {
    accessToken: string;
    user: User;
  };
}

interface AuthCredentials {
  email: string;
  password: string;
}

interface AxiosErrorWithResponse extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface UpdateUserParams {
  id: string;
  body: UserFormDataBody;
}

interface Users {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;  
}

export const register = createAsyncThunk<AuthResponse['data'], AuthCredentials, { rejectValue: string }>(
  'auth/register',
  async (credentials: AuthCredentials, thunkApi) => {
    try {
      await messagesApi.post('/auth/register', credentials);
      const { email, password } = credentials;
      try {
        const loginResponse: AuthResponse = await messagesApi.post('/auth/login', { email, password });
        setToken(loginResponse.data.accessToken);
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

export const logIn = createAsyncThunk<AuthResponse['data'], AuthCredentials, { rejectValue: string }>(
  'auth/login',
  async (credentials: AuthCredentials, thunkAPI) => {
    try {
      const { data }: AuthResponse = await messagesApi.post('auth/login', credentials);
      setToken(data.accessToken);
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
      setToken(data.accessToken);
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

export const updateUser = createAsyncThunk<Users, UpdateUserParams, { rejectValue: string }>(
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

export const sendResetEmail = createAsyncThunk<void, string, { rejectValue: string }>(
  'auth/sendResetEmail',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await messagesApi.post('/auth/send-reset-email', { email });
      return response.data;
    } catch (error: unknown) {
      if ((error as AxiosErrorWithResponse).response) {
        return rejectWithValue((error as AxiosErrorWithResponse).response?.data?.message || 'Unable to send a password reset email');
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unexpected error occurred');
    }
  }
);

export const resetPassword = createAsyncThunk<void, { token: string; password: string }, { rejectValue: string }>(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await messagesApi.post('/auth/reset-pwd', { token, password });
      return response.data;
    } catch (error: unknown) {
      if ((error as AxiosErrorWithResponse).response) {
        return rejectWithValue((error as AxiosErrorWithResponse).response?.data?.message || 'Could not reset password');
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unexpected error occurred');
    }
  }
);

export const getGoogleAuthUrl = async (): Promise<string> => {
  try {
    const res = await messagesApi.get('/auth/get-oauth-url');
    if (res.status !== 200) {
      throw new Error('Unable to get authorization URL');
    }
    return res.data.data.url;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error getting Google Auth URL: ${error.message}`);
    }
    throw new Error('Unexpected error occurred');
  }
};

export const exchangeAuthCodeForToken = createAsyncThunk<void, string, { rejectValue: string }>(
  'auth/exchangeAuthCodeForToken',
  async (code: string, { rejectWithValue }) => {
    try {
      const res = await messagesApi.post('/auth/confirm-oauth', { code });
      if (res.status !== 200) {
        throw new Error('Error exchanging code for token');
      }
      setToken(res.data.data.accessToken);
      return res.data.data;
    } catch (error: unknown) {
      if ((error as AxiosErrorWithResponse).response) {
        return rejectWithValue('Error sending code to server');
      }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unexpected error occurred');
    }
  }
);
