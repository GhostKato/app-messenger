import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchUsers} from './operations';
import { logOut } from '../auth/operations';
import { User } from "@/types/userTypes";

interface FetchUsersResponse {
  data: User[]; 
}

interface UsersState {
  users: User[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  isError: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}, 
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const payload = action.payload as unknown as FetchUsersResponse;
        state.users = payload.data || [];
      })      
      .addCase(logOut.fulfilled, () => {
        return initialState; 
      })
      .addMatcher(
        isAnyOf(fetchUsers.pending),
        state => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(fetchUsers.rejected),
        state => {
          state.isLoading = false;
          state.isError = true;
        }
      )
      .addMatcher(
        isAnyOf(fetchUsers.fulfilled),
        state => {
          state.isLoading = false;
          state.isError = false;
        }
      );
  },
});

export const usersReducer = usersSlice.reducer;
