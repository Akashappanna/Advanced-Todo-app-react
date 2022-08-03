import React, { useState } from "react";

const Login = (props) => {
  //object destructuring
  const { onLogin } = props;
  //userinputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //userinputs handlers
  const nameHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  //submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    onLogin({ name: username, password: password });
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login">
      <h3>Welcome to the todo app</h3>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">username : </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={nameHandler}
          />
        </div>

        <div>
          <label htmlFor="password">password : </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={passwordHandler}
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
