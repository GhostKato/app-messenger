import { createSelector } from "@reduxjs/toolkit";
import { selectUsers } from "../user/selectors";
import { RootState } from '../store';
import { User } from "@/types/userTypes";

export const selectNameFilter = (state: RootState) => state.filters.name;

export const selectFilteredUsers = createSelector(
  [selectUsers as (state: RootState) => User[], selectNameFilter],
  (users: User[], nameFilter: string) => {
    if (!nameFilter) {
      return users;
    }
    const filteredUsers = users.filter(user =>
      user.name?.toLowerCase().includes(nameFilter.toLowerCase())
    );
    return filteredUsers;
  }
);
