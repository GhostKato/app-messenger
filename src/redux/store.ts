import { configureStore } from "@reduxjs/toolkit";
import modalsReducer from './modal/slice';

export const store = configureStore({
  reducer: {   
    modals: modalsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});