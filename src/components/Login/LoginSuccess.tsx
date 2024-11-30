import React, { useEffect } from "react";
import success from "../../assets/Login/Success.gif";
import { useDispatch } from "react-redux";

const LoginSuccessComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: "userLoggedIn",
      });
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col items-center place-content-center justify-center gap-8 px-4">
      <img src={success} alt="Success" />
      <h1 className="text-4xl font-medium text-secondary whitespace-nowrap">
        Logged in Successfully
      </h1>

      <button className="px-6 py-3 w-52 font-medium border rounded-lg bg-primary hover:bg-green-500 text-white text-lg">
        Create Album
      </button>

      <a
        href="/"
        className="text-lg font-medium border rounded-lg text-primary hover:text-green-700 no-underline"
      >
        Home
      </a>
    </div>
  );
};

export default LoginSuccessComponent;
