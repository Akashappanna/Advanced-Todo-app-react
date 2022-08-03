import React, { useState } from "react";
//components files
import Login from "./components/Login/Login";
import LoginError from "./components/Login/LoginError";
//css
import "./App.css";
import Todo from "./components/Todo/Todo";

//login data
const loginData = { name: "admin", password: "admin", userId: 45656 };

function App() {
  //login details state
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loginError, setLoginError] = useState(null);

  //login component value handler
  const loginHandler = (loginValue) => {
    if (
      loginData.name !== loginValue.name ||
      loginData.password !== loginValue.password
    ) {
      setLoginError("Login details do not match");
      return;
    }

    setIsLoggedin(true);
  };

  return (
    <div className="App">
      {!isLoggedin && !loginError && <Login onLogin={loginHandler} />}
      {!isLoggedin && loginError && <LoginError error={loginError} />}
      {isLoggedin && <Todo userId={loginData.userId} />}
    </div>
  );
}

export default App;
