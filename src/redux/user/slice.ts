import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "./operations";
import { UserType } from "@/types/userTypes";

type UsersState = {
  users: UserType[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  isError: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUserStatus: (
      state,
      action: PayloadAction<{ userId: string; status: "online" | "offline" }>
    ) => {
      const { userId, status } = action.payload;
      const user = state.users.find((user) => user._id === userId);
      if (user) {
        user.status = status;
      }      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
         state.isError = false;
      });
  },
});

export const { updateUserStatus } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
