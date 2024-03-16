import { configureStore } from "@reduxjs/toolkit";
import bagSliceReducer from "./bag/bagSlice";

export const store = configureStore({
  reducer: {
    bag: bagSliceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;