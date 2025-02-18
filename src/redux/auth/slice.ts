import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@/types/userTypes";
import {
  register,
  logIn,
  logOut,
  refresh,
  updateUser,
} from "./operations";

type AuthResponse = { 
  accessToken?: string;
  user: UserType;
};

type AuthResponseRefresh = {
  data: { 
    data: {
      accessToken?: string;
      user: UserType;
    }
  };
}

type AuthState = {
  user: UserType;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isError: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: {
    name: null,
    email: null,
    photo: null,
    _id: null,
    status: '', 
  },
  isLoggedIn: false,
  isRefreshing: false,
  isError: false,
  isLoading: false,
};

const updateUserData = (state: AuthState, action: PayloadAction<AuthResponse>) => {
  const user = action.payload.user;

  if (!user) return;

  const { name = null, email = null, photo = null, _id = null, status = '' } = user;
  state.user = { name, email, photo, _id, status };   
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        updateUserData(state, action);
      })
      .addCase(logIn.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        updateUserData(state, action);
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        const { name, email, photo, _id, status } = action.payload;        
        state.user = { name, email, photo, _id, status };
      })
      .addCase(logOut.fulfilled, () => ({
        ...initialState,
        isLoggedIn: false,
      }))
      .addCase(refresh.fulfilled, (state, action: PayloadAction<AuthResponseRefresh['data']>) => {
        state.user = action.payload.data.user; 
        state.isRefreshing = false;         
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.user = { name: null, email: null, photo: null, _id: null, status: '' };
      })
      .addMatcher(
        isAnyOf(
          register.pending,
          logIn.pending,
          refresh.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          register.rejected,
          logIn.rejected,
          refresh.rejected,
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
          state.isLoggedIn = false;
        }
      )
      .addMatcher(
        isAnyOf(
          register.fulfilled,
          logIn.fulfilled,
          refresh.fulfilled,
        ),
        (state) => {
          state.isLoading = false;
          state.isError = false;
          state.isLoggedIn = true;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
