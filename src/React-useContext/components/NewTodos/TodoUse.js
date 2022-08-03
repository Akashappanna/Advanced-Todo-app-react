import React, { useContext } from "react";
import TodoContext from "./todoContext/TodoContext";

const TodoUse = (props) => {
  const ctx = useContext(TodoContext);
  return (
    <React.Fragment>
      <h1> TodoUse</h1>
      <button type="button" onClick={ctx.changeState}>
        Change State
      </button>
      {ctx.text && <h3>Welcome to this page </h3>}
    </React.Fragment>
  );
};

export default TodoUse;
