import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/userTypes";
import {
  register,
  logIn,
  logOut,
  refreshUser,
  updateUser,
} from "./operations";


type AuthResponse = { 
  accessToken?: string;
  user: User;
};

interface AuthState {
  user: User;
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

// Функція для оновлення даних користувача
const updateUserData = (state: AuthState, action: PayloadAction<AuthResponse>) => {
  const user = action.payload.user;
  
  if (!user) return;

  const { name = null, email = null, photo = null, _id = null } = user;
  state.user = { name, email, photo, _id };
  state.isLoggedIn = true; // Встановлюємо isLoggedIn в true
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Коли реєстрація успішна
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        updateUserData(state, action);
      })
      // Коли логін успішний
      .addCase(logIn.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        updateUserData(state, action);
      })
      // Коли оновлення користувача успішне
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const { name, email, photo, _id } = action.payload;
        state.user = { name, email, photo, _id };
      })
      // Коли лог-аут успішний
      .addCase(logOut.fulfilled, () => initialState)
      // Коли оновлення користувача після рефреша успішне
      .addCase(refreshUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        updateUserData(state, action);
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
