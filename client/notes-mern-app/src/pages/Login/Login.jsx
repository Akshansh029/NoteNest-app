/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import PasswordField from "../../components/PasswordField/PasswordField";
import validateEmail from "../../utils/validateEmail";
import axiosInstance from "../../utils/axiosInstance";

const Login = ({ isDarkMode, setIsDarkMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please provide a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    //Login API integration
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      //Handling successful response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken); // Use setItem instead of setItems
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured");
      }
    }
  };

  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <div
        className={`flex justify-center items-center h-calc-100-minus-64 ${
          isDarkMode ? "bg-darkBg" : "bg-white"
        }`}
      >
        <div
          className={`w-96 border-2 border-slate-300 rounded px-7 py-10 ${
            isDarkMode ? "bg-darkNav border-gray-500" : "bg-white"
          }`}
        >
          <form onSubmit={handleLogin} className="">
            <h4
              className={`text-2xl mb-7 ${
                isDarkMode ? "text-darkTextColor" : ""
              }`}
            >
              Login
            </h4>

            <input
              type="text"
              placeholder="Email"
              className={`input-box ${
                isDarkMode ? "border-darkTextColor text-darkTextColor" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isDarkMode={isDarkMode}
            />

            {error && (
              <p className="text-red-500 text-sm font-medium bg-transparent">
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p
              className={`text-sm text-center mt-4 ${
                isDarkMode ? "text-darkTextColor" : ""
              }`}
            >
              Don't have an account{" "}
              <Link to="/signup" className="text-blue-600 underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
