import React, { useEffect } from "react";
import success from "../../assets/Login/Success.gif";
import { useDispatch } from "react-redux";

interface SuccessComponentProps {
  type: string;
  title: string;
}

const LoginSuccessComponent: React.FC<SuccessComponentProps> = ({
  type,
  title,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "Login") {
      setTimeout(() => {
        dispatch({
          type: "userLoggedIn",
        });
      }, 3000);
    }
  }, [type]);

  return (
    <div
      className={`flex flex-col items-center place-content-center justify-center gap-8 px-4 ${
        type !== "Login" && "bg-white rounded-xl py-10"
      }`}
    >
      <img src={success} alt="Success" />
      <h1
        className={`text-4xl font-medium text-secondary ${
          type !== "Login"
            ? "text-center leading-snug w-80"
            : "whitespace-nowrap"
        }`}
      >
        {title}
      </h1>
      {type === "requestSeller" && (
        <div className="text-teritary text-xl text-center -mt-5 w-72">
          Your application in under review. Meanwhile, feel free to explore
          Growers hub.
        </div>
      )}

      {type === "Login" && (
        <>
          <button className="px-6 py-3 w-52 font-medium border rounded-lg bg-primary hover:bg-green-500 text-white text-lg">
            Create Album
          </button>

          <a
            href="/"
            className="text-lg font-medium rounded-lg text-primary hover:text-green-700 no-underline"
          >
            Home
          </a>
        </>
      )}
    </div>
  );
};

export default LoginSuccessComponent;
