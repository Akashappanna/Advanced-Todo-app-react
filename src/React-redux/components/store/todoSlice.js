import { createSlice } from "@reduxjs/toolkit";
import useHttp from "../../hooks/useHttp";

//todo slice
const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    backup: [],
    error: null,
    isLoading: false,
    data: [],
  },
  //   initialState: false,
  reducers: {
    //set todo
    setTodo(state, action) {
      if (action.payload.text === "all") {
        state.todos = action.payload.todoData;
        state.backup = action.payload.todoData;
        return;
      }
      state.todos = action.payload.todoData;
    },

    //change loading state
    changeIsLoading(state, action) {
      state.isLoading = action.payload;
    },

    //add todo
    addTodo(state, action) {
      if (action.payload.title === "") {
        return console.log("input is empty");
      }
      action.payload.todo.status = "Todo";
      action.payload.todo.isView = false;
      action.payload.todo.userId = action.payload.userId;
      const newTodo = [...state.backup, action.payload.todo];
      state.backup = newTodo;
      state.todos = newTodo;
      state.data = newTodo;
    },

    //delete todo
    deleteTodo(state, action) {
      const deleteTodo = state.backup.filter(
        (todo) => todo.id !== action.payload
      );
      state.backup = deleteTodo;
      state.todos = deleteTodo;
      state.data = deleteTodo;
    },

    //view todo
    viewTodo(state, action) {
      const updatedTodo = state.backup.map((todo) => {
        if (todo.id === action.payload) {
          todo.isView = !todo.isView;
        }
        return todo;
      });
      state.backup = updatedTodo;
      state.todos = updatedTodo;
    },

    //status change
    statusChange(state, action) {
      const newUpdate = state.backup.map((todo) => {
        if (todo.id === action.payload) {
          if (todo.status === "Todo" || todo.status === "Done") {
            todo.status = "InProgress";
          } else if (todo.status === "InProgress") {
            todo.status = "Done";
          }
        }
        return todo;
      });
      state.backup = newUpdate;
      state.todos = newUpdate;
      state.data = newUpdate;
    },

    //edit todo
    editTodo(state, action) {
      const editTodo = state.backup.map((todo) => {
        if (todo.id === action.payload.id) {
          if (action.payload.title === "") {
            return todo;
          }
          todo.title = action.payload.title;
          todo.descrp = action.payload.descrp;
        }
        return todo;
      });
      state.backup = editTodo;
      state.todos = editTodo;

      //new data
      const newEdit = editTodo.map((editItem) => {
        return { ...editItem };
      });
      newEdit.map((item) => {
        if (item.id === action.payload.id) {
          item.isView = false;
          return item;
        }
      });

      state.data = newEdit;
    },

    //filter todo
    filterTodo(state, action) {
      if (action.payload.filterKey === "title" && !action.payload.filterState) {
        const filterList = state.todos.map((todo) => todo.title);
        const filterData = filterList.sort().map((newTodo) =>
          state.todos.filter((todo) => {
            if (todo.title === newTodo) {
              return todo;
            }
          })
        );

        const filterTodo = filterData.map((fData) => fData[0]);
        state.todos = filterTodo;
        return;
      }
      if (action.payload.filterKey === "title" && action.payload.filterState) {
        const filterList = state.todos.map((todo) => todo.title);
        const filterData = filterList.reverse().map((newTodo) =>
          state.todos.filter((todo) => {
            if (todo.title === newTodo) {
              return todo;
            }
          })
        );
        const filterTodo = filterData.map((fData) => fData[0]);
        state.todos = filterTodo;
      }

      if (action.payload.filterState === "status") {
        const selectedTodo = state.backup.filter(
          (todo) => todo.status === action.payload.filterKey
        );
        if (selectedTodo.length === 0) {
          state.error = `no todo found with status '${action.payload.filterKey}'`;
          selectedTodo.push({});
          state.todos = selectedTodo;
          return;
        }
        state.error = null;
        state.todos = selectedTodo;
      }

      if (action.payload.filterKey === "clear") {
        state.error = null;
        state.todos = state.backup;
      }
    },
  },
});

//todo action
export const todoActions = todoSlice.actions;

export const FetchData = () => {
  //hooks
  const { sendRequest } = useHttp();
  return (dispatch) => {
    dispatch(todoActions.changeIsLoading(true));
    const fetchTodo = (data) => {
      if (data) {
        dispatch(todoActions.setTodo({ todoData: data, text: "all" }));
      }
      dispatch(todoActions.changeIsLoading(false));
    };

    sendRequest({}, fetchTodo);
  };
};

export const SendData = (data) => {
  //hooks
  const { sendRequest } = useHttp();

  return (dispatch) => {
    sendRequest(
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
      },
      () => {}
    );
  };
};

export default todoSlice.reducer;
