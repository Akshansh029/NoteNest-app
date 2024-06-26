/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import PasswordField from "../../components/PasswordField/PasswordField";
import validateEmail from "../../utils/validateEmail";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/ToastMessage";

const Signup = ({ isDarkMode, setIsDarkMode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "",
  });

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
      type: "",
    });
  };

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter a username");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please provide a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    //Signup API integration
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.error);
        return;
      }

      //Handling successful signup response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        showToastMessage(
          "User registered successfully, please login into your account",
          "edit"
        );
        setTimeout(() => {
          navigate("/");
        }, 3000);
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
          <form onSubmit={handleSignup} className="">
            <h4
              className={`text-2xl mb-7 ${
                isDarkMode ? "text-darkTextColor" : ""
              }`}
            >
              Signup
            </h4>

            <input
              type="text"
              placeholder="Username"
              className={`input-box ${isDarkMode ? "text-darkTextColor" : ""}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className={`input-box ${isDarkMode ? "text-darkTextColor" : ""}`}
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
              Signup
            </button>

            <p
              className={`text-sm text-center mt-4 ${
                isDarkMode ? "text-darkTextColor" : ""
              }`}
            >
              Already have an account?{" "}
              <Link to="/" className="text-blue-600 underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Signup;
