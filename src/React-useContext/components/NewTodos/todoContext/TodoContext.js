import React, { useState } from "react";

const TodoContext = React.createContext({
  text: null,
  changeState: () => {},
});

export const TodoAppContext = (props) => {
  const [text, setText] = useState(false);

  const changeStateHandler = () => {
    setText((prevState) => !prevState);
  };

  return (
    <TodoContext.Provider
      value={{ text: text, changeState: changeStateHandler }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
