import { configureStore } from "@reduxjs/toolkit";
import businessesReducer from "./slices/businessSlice";

const store = configureStore({
  reducer: {
    businesses: businessesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
