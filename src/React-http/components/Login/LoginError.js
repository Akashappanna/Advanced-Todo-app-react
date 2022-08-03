import React from "react";

const LoginError = (props) => {
  return (
    <div>
      <h3>LoginError</h3>
      <p>{props.error}</p>
    </div>
  );
};

export default LoginError;
