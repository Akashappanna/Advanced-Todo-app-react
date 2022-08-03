import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import loading from "../../assets/loading.gif";
import useHttp from "../../hooks/useHttp";
//css
import "./Todo.css";
import { FetchData, SendData, todoActions } from "../store/todoSlice";

let initialChange = true;

const Todo = (props) => {
  //hooks
  const { sendRequest } = useHttp();

  //redux
  const isLoading = useSelector((state) => state.todo.isLoading);
  const todos = useSelector((state) => state.todo.todos);
  const error = useSelector((state) => state.todo.error);
  const data = useSelector((state) => state.todo.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchData());
  }, []);

  useEffect(() => {
    if (initialChange) {
      initialChange = false;
      return;
    }
    dispatch(SendData(data));
  }, [data]);

  //add todo handler
  const addTodoHandler = (todo) => {
    dispatch(todoActions.addTodo({ todo: todo, userId: props.userId }));
  };

  //delete todo handler
  const deleteTodoHandler = (todoId) => {
    dispatch(todoActions.deleteTodo(todoId));
  };

  //view todo Handler
  const viewTodoHandler = (id) => {
    dispatch(todoActions.viewTodo(id));
  };

  //change status
  const statusChangeHandler = (todoId) => {
    dispatch(todoActions.statusChange(todoId));
  };

  //edit todo handler
  const editTodoHandler = (todoValue) => {
    dispatch(todoActions.editTodo(todoValue));
  };

  const filterTodoHandler = (filterKey, filterState) => {
    dispatch(
      todoActions.filterTodo({ filterKey: filterKey, filterState: filterState })
    );
  };

  return (
    <div>
      <h1>Todo</h1>
      <TodoForm onSubmitTodo={addTodoHandler} />
      {isLoading && <img src={loading} alt="loading" className="loading" />}
      {!isLoading && (
        <TodoList
          todos={todos}
          error={error}
          onDelete={deleteTodoHandler}
          onViewTodo={viewTodoHandler}
          onStatus={statusChangeHandler}
          onEdit={editTodoHandler}
          onFilter={filterTodoHandler}
        />
      )}
    </div>
  );
};

export default Todo;
