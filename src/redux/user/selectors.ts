import { RootState } from '../store';

export const selectUsers = (state: RootState) => state.users.users;
export const selectIsLoading = (state: RootState) => state.users.isLoading;
export const selectIsError = (state: RootState) => state.users.isError;

export const selectUserStatus = (state: RootState) => state.users.userStatus;

export const selectUserStatusById = (userId: string) => (state: RootState) =>
  state.users.userStatus[userId];
