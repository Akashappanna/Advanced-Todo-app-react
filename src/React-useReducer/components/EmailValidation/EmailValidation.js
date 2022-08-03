import React, { useDebugValue, useEffect, useReducer, useState } from "react";
//css
import "./EmailValidation.css";

//usereducers
//email reducer
const emailReducer = (state, action) => {
  if (action.type === "add") {
    return {
      value: action.val,
      isvalid: action.val.includes("@"),
    };
  }
  if (action.type === "blur") {
    return {
      value: state.value,
      isvalid: state.value.includes("@"),
    };
  }
  if (action.type === "reset") {
    return { value: "", isvalid: null };
  }
  return { value: "", isvalid: false };
};

//password reducer
const passwordReducer = (state, action) => {
  if (action.type === "add") {
    return { value: action.val, isvalid: action.val.trim().length > 6 };
  }
  if (action.type === "blur") {
    return { value: state.value, isvalid: state.value.trim().length > 6 };
  }
  if (action.type === "reset") {
    return { value: "", isvalid: null };
  }
  return { value: "", isvalid: false };
};

const EmailValidation = () => {
  //usereducer state
  const [emailState, dispatchemail] = useReducer(emailReducer, {
    value: "",
    isvalid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isvalid: null,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const emailHandler = (e) => {
    dispatchemail({ type: "add", val: e.target.value });
    setFormIsValid(e.target.value.includes("@") && passwordState.isvalid);
  };
  const emailValidHandler = () => {
    dispatchemail({ type: "blur" });
  };
  const passwordHandler = (e) => {
    dispatchPassword({ type: "add", val: e.target.value });
    setFormIsValid(emailState.isvalid && e.target.value.trim().length > 6);
  };
  const passwordvalidHandler = () => {
    dispatchPassword({ type: "blur" });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log({ email: emailState.value, password: passwordState.value });
    dispatchemail({ type: "reset" });
    dispatchPassword({ type: "reset" });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={emailState.isvalid === false ? "invalid" : ""}>
        <label htmlFor="name">email : </label>
        <input
          type="text"
          name="email"
          id="email"
          value={emailState.value}
          onChange={emailHandler}
          onBlur={emailValidHandler}
        />
        {emailState.isvalid === false && (
          <p className="error">* Enter valid email</p>
        )}
      </div>

      <div className={passwordState.isvalid === false ? "invalid" : ""}>
        <label htmlFor="password">Password : </label>
        <input
          type="text"
          name="password"
          id="password"
          value={passwordState.value}
          onChange={passwordHandler}
          onBlur={passwordvalidHandler}
        />
        {passwordState.isvalid === false && (
          <p className="error">* Enter valid password</p>
        )}
      </div>

      <div>
        <button type="submit" disabled={!formIsValid}>
          Login
        </button>
      </div>
    </form>
  );
};

export default EmailValidation;
