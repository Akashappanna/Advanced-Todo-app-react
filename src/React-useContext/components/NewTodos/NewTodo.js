import React, { useContext, useState } from "react";
import { TodoAppContext } from "./todoContext/TodoContext";
import NewTodouse from "./NewTodouse";

const NewTodo = () => {
  return (
    <TodoAppContext>
      <h3>New Todo</h3>
      <NewTodouse />
    </TodoAppContext>
  );
};

export default NewTodo;
