import React, { useState } from "react";
import LoginPage from "../components/Login/LoginPage";
import LoginSuccessComponent from "../components/Login/LoginSuccess";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [LoginSuccess, setLoginSuccess] = useState(false);

  return (
    <>
      {LoginSuccess ? (
        <LoginSuccessComponent />
      ) : (
        <LoginPage
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          setLoginSuccess={setLoginSuccess}
        />
      )}
    </>
  );
};

export default Login;
