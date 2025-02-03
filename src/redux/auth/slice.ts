import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/userTypes";
import {
  register,
  logIn,
  logOut,
  refreshUser,
  sendResetEmail,
  resetPassword,
  exchangeAuthCodeForToken,
  // updateUser
} from "./operations";

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
    id: null,
  },
  isLoggedIn: false,
  isRefreshing: false,
  isError: false,
  isLoading: false,
};

interface AuthResponse {
  accessToken: string;
  user: User;
}

// Оновлення даних користувача
const updateUserData = (state: AuthState, action: PayloadAction<AuthResponse>) => {
  const { name, email, photo, id } = action.payload.user;
  state.user = { name, email, photo, id };
  state.isLoggedIn = true;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Оновлення даних користувача після успішної реєстрації
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        updateUserData(state, action);
      })
      // Оновлення даних користувача після успішного входу
      .addCase(logIn.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        updateUserData(state, action);
      })
      // Оновлення даних користувача після отримання токену за допомогою авторизації
      // .addCase(exchangeAuthCodeForToken.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      //   updateUserData(state, action);
      // })
      // Оновлення даних користувача після зміни
      // .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
      //   const { name, email, photo, id } = action.payload;
      //   state.user = { name, email, photo, id };
      // })
      // Вихід користувача — скидаємо стейт
      .addCase(logOut.fulfilled, () => initialState)
      // Оновлення даних користувача після перевірки токену
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
        state.user = { name: null, email: null, photo: null, id: null };
      })
      .addMatcher(isAnyOf(
        register.pending,
        logIn.pending,
        refreshUser.pending,
        exchangeAuthCodeForToken.pending,
        resetPassword.pending,
        sendResetEmail.pending
      ), (state) => {        
        state.isLoading = true;
        state.isError = false;
      })
      .addMatcher(isAnyOf(
        register.rejected,
        logIn.rejected,
        refreshUser.rejected,
        exchangeAuthCodeForToken.rejected,
        resetPassword.rejected,
        sendResetEmail.rejected
      ), (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addMatcher(isAnyOf(
        register.fulfilled,
        logIn.fulfilled,
        refreshUser.fulfilled,
        exchangeAuthCodeForToken.fulfilled
      ), (state) => {
        state.isLoading = false;
        state.isError = false;
      });
  }
});

export const authReducer = authSlice.reducer;
