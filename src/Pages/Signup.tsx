import React, { useState } from "react";
import LoginSuccessComponent from "../components/Login/LoginSuccess";
import SignupPage from "../components/Signup/SignupPage";

const Signup: React.FC = () => {
  const [SignupSuccess, setSignupSuccess] = useState(false);

  return (
    <>
      {SignupSuccess ? (
        <LoginSuccessComponent type="Login" title="Logged in Successfully" />
      ) : (
        <SignupPage />
      )}
    </>
  );
};

export default Signup;
