import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from "./todoSlice";

const store = configureStore({
  reducer: { todo: todoSliceReducer },
});

export default store;
