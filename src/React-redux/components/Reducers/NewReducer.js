import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoAction } from "../Reducers/store/todoStore";

const NewReducer = () => {
  const todoState = useSelector((state) => state.nt);
  const dispatch = useDispatch();

  const stateChangeHandler = () => {
    dispatch(todoAction.changeState());
  };
  console.log(todoState);

  return (
    <div>
      <h3>NewReducer</h3>
      <button type="button" onClick={stateChangeHandler}>
        Change state
      </button>
      {todoState && <p> This is a newreducer page</p>}
    </div>
  );
};

export default NewReducer;
