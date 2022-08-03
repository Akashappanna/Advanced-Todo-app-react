import { configureStore, createSlice } from "@reduxjs/toolkit";
const initialvalue = false;
const newTodoSlice = createSlice({
  name: "nt",
  initialState: initialvalue,
  reducers: {
    changeState(state) {
      return (state = !state);
    },
  },
});

export const todoAction = newTodoSlice.actions;

const store = configureStore({
  reducer: { nt: newTodoSlice.reducer },
});

export default store;
