import { RootState } from "../store";

export const selectMessages = (state: RootState) => state.messages.messages;
export const selectIsLoading = (state: RootState) => state.messages.isLoading;
export const selectIsError = (state: RootState) => state.messages.isError;