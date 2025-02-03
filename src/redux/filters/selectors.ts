import { createSelector } from "@reduxjs/toolkit";
import { selectUsers } from "../user/selectors";
import { RootState } from '../store';

interface User {
  _id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string; 
}

export const selectNameFilter = (state: RootState) => state.filters.name;

export const selectFilteredUsers = createSelector(
  [selectUsers as (state: RootState) => User[], selectNameFilter],
  (users: User[], nameFilter: string) => {
    if (!nameFilter) {
      return users;
    }
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
    return filteredUsers;
  }
);
