import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "./operations";
import { UserType } from "@/types/userTypes";

interface UsersState {
  users: UserType[];
  userStatus: Record<string, "online" | "offline">;
  isLoading: boolean;
  isError: boolean;
}

const initialState: UsersState = {
  users: [],
  userStatus: {}, 
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
      state.userStatus[userId] = status; 
    },
    setAllUsersStatus: (
      state,
      action: PayloadAction<Record<string, "online" | "offline">>
    ) => {
      state.userStatus = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        
        state.userStatus = action.payload.data.reduce(
          (acc, user) => {
            if (user._id) {
              acc[user._id] = "offline"; 
            }
            return acc;
          },
          {} as Record<string, "online" | "offline">
        );
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isError = true;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { updateUserStatus, setAllUsersStatus } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
