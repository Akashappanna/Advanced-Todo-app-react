import React, { useState, useContext } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
//css
import "./Todo.css";
import TodoAppContext, { TodoContextAPI } from "../../todo-context/TodoContext";
//use context file

const Todo = (props) => {
  return (
    <div>
      <TodoContextAPI userId={props.userId}>
        <h1>Todo</h1>
        <TodoForm />
        <TodoList />
      </TodoContextAPI>
    </div>
  );
};

export default Todo;
