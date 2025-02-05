import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { usersReducer } from "./user/slice";
import { messagesReducer } from "./messages/slice";
import modalsReducer from './modal/slice';
import { filterReducer } from "./filters/slice";

export const store = configureStore({
  reducer: {  
    auth: authReducer,
    users: usersReducer,
    messages: messagesReducer,
    modals: modalsReducer,
     filters: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;