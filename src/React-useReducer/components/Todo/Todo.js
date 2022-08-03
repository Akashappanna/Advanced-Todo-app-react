import React, { useState, useReducer, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
//css
import "./Todo.css";

//initial state
const initialState = {
  todosR: [],
  backup: [],
  error: null,
};
//usereducer
const todoReducer = (state, action) => {
  //addtodo
  if (action.type === "add-todo") {
    return {
      todosR: [...state.todosR, action.val],
      backup: [...state.backup, action.val],
      error: state.error,
    };
  }

  //deletetodo
  if (action.type === "delete") {
    const deleteTodo = state.backup.filter((todo) => todo.id !== action.val);
    return {
      todosR: deleteTodo,
      backup: deleteTodo,
      error: state.error,
    };
  }

  //view
  if (action.type === "view") {
    const updatedTodo = state.backup.map((todo) => {
      if (todo.id === action.val) {
        todo.isView = !todo.isView;
      }
      return todo;
    });

    return {
      todosR: updatedTodo,
      backup: updatedTodo,
      error: state.error,
    };
  }

  //status
  if (action.type === "status") {
    const newUpdate = state.backup.map((todo) => {
      if (todo.id === action.val) {
        if (todo.status === "Todo" || todo.status === "Done") {
          todo.status = "InProgress";
        } else if (todo.status === "InProgress") {
          todo.status = "Done";
        }
      }
      return todo;
    });

    return {
      todosR: newUpdate,
      backup: newUpdate,
      error: state.error,
    };
  }

  //edit
  if (action.type === "edit") {
    const editTodo = state.backup.map((todo) => {
      if (todo.id === action.val.id) {
        if (action.val.title === "") {
          return todo;
        }
        todo.title = action.val.title;
        todo.descrp = action.val.descrp;
      }
      return todo;
    });

    return {
      todosR: editTodo,
      backup: editTodo,
      error: state.error,
    };
  }

  //filter
  if (action.type === "filter") {
    if (action.val[0] === "title" && !action.val[1]) {
      const filterList = state.todosR.map((todo) => todo.title);
      const filterData = filterList.sort().map((newTodo) =>
        state.todosR.filter((todo) => {
          if (todo.title === newTodo) {
            return todo;
          }
        })
      );
      const filterTodo = filterData.map((fData) => fData[0]);
      return {
        todosR: filterTodo,
        backup: state.backup,
        error: state.error,
      };
    }
    if (action.val[0] === "title" && action.val[1]) {
      const filterList = state.todosR.map((todo) => todo.title);
      const filterData = filterList.reverse().map((newTodo) =>
        state.todosR.filter((todo) => {
          if (todo.title === newTodo) {
            return todo;
          }
        })
      );
      const filterTodo = filterData.map((fData) => fData[0]);
      return {
        todosR: filterTodo,
        backup: state.backup,
        error: state.error,
      };
    }

    if (action.val[1] === "status") {
      const selectedTodo = state.backup.filter(
        (todo) => todo.status === action.val[0]
      );
      if (selectedTodo.length === 0) {
        selectedTodo.push({});
        return {
          todosR: selectedTodo,
          backup: state.backup,
          error: `no todo found with status '${action.val[0]}'`,
        };
      }
      return {
        todosR: selectedTodo,
        backup: state.backup,
        error: null,
      };
    }

    if (action.val[0] === "clear") {
      return {
        todosR: state.backup,
        backup: state.backup,
        error: null,
      };
    }
  }

  return initialState;
};

const Todo = (props) => {
  //userreducer state
  const [todoState, dispatch] = useReducer(todoReducer, initialState);

  //add todo handler
  const addTodoHandler = (todo) => {
    if (todo.title === "") {
      return console.log("input is empty");
    }
    todo.status = "Todo";
    todo.isView = false;
    todo.userId = props.userId;
    dispatch({ type: "add-todo", val: todo });
  };

  //delete todo handler
  const deleteTodoHandler = (todoId) => {
    dispatch({ type: "delete", val: todoId });
  };

  //view todo Handler
  const viewTodoHandler = (id) => {
    dispatch({ type: "view", val: id });
  };

  //change status
  const statusChangeHandler = (todoId) => {
    dispatch({ type: "status", val: todoId });
  };

  //edit todo handler
  const editTodoHandler = (todoValue) => {
    dispatch({ type: "edit", val: todoValue });
  };

  //filter todo handler
  const filterTodoHandler = (filterKey, filterState) => {
    dispatch({ type: "filter", val: [filterKey, filterState] });
  };

  return (
    <div>
      <h1>Todo</h1>
      <TodoForm onSubmitTodo={addTodoHandler} />

      <TodoList
        todos={todoState.todosR}
        error={todoState.error}
        onDelete={deleteTodoHandler}
        onViewTodo={viewTodoHandler}
        onStatus={statusChangeHandler}
        onEdit={editTodoHandler}
        onFilter={filterTodoHandler}
      />
    </div>
  );
};

export default Todo;
