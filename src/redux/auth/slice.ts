import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@/types/userTypes";
import {
  register,
  logIn,
  logOut,
  refreshUser,
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
  },
  isLoggedIn: false,
  isRefreshing: false,
  isError: false,
  isLoading: false,
};


const updateUserData = (state: AuthState, action: PayloadAction<AuthResponse>) => {
  const user = action.payload.user;
  
  if (!user) return;

  const { name = null, email = null, photo = null, _id = null } = user;
  state.user = { name, email, photo, _id };
  state.isLoggedIn = true; 
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
        const { name, email, photo, _id } = action.payload;
        console.log(action.payload);
        state.user = { name, email, photo, _id };
      })
      
      .addCase(logOut.fulfilled, () => initialState)
      
      .addCase(refreshUser.fulfilled, (state, action: PayloadAction<AuthResponseRefresh['data']>) => {
      state.user = action.payload.data.user; 
      state.isRefreshing = false; 
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.user = { name: null, email: null, photo: null, _id: null };
      })
      .addMatcher(
        isAnyOf(
          register.pending,
          logIn.pending,
          refreshUser.pending,
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
          refreshUser.rejected,
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      )
      .addMatcher(
        isAnyOf(
          register.fulfilled,
          logIn.fulfilled,
          refreshUser.fulfilled,
        ),
        (state) => {
          state.isLoading = false;
          state.isError = false;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
