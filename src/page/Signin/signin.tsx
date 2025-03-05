import React, { useState } from "react";
import "./signin.css";
import CloseIcon from "@mui/icons-material/Close";
import { useLoginMutation, useRegisterMutation } from "../posApi";
import { useNotifier } from "../../core/Notifier";
import { useAppDispatch } from "../../store/hooks";
import { setEnableAuth } from "./store/AuthSlice";
import { IAuth } from "../../core/interface/api.interface";

interface LoginPopupProps {
  setShowLogin: (value: boolean) => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState<"Log In" | "Sign Up">(
    "Log In"
  );
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const { showErrorMessage, showMessage } = useNotifier();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));

    // Validation logic
    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Invalid email format",
      }));
    }
    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ""
          : "Password must be at least 6 characters long and include a number",
      }));
    }
    if (name === "name" && value.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        name: "Name is required",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        name: "",
      }));
    }
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateEmail(data.email) || !validatePassword(data.password)) {
      return;
    }

    try {
      if (currentState === "Log In") {
        const response = await login({
          email: data.email,
          password: data.password,
        }).unwrap();
        if (!response.status) {
          showErrorMessage(response.message);
        } else {
          const tokenData = response.data as IAuth;
          localStorage.setItem("token", tokenData.token);
          localStorage.setItem("name", tokenData.user.name);
          dispatch(setEnableAuth());
          showMessage(response.message);
        }
      } else {
        const response = await register({
          name: data.name,
          email: data.email,
          password: data.password,
          role: 0,
        }).unwrap();
        if (!response.status) {
          showErrorMessage(response.message);
        } else {
          showMessage(response.message);
        }
      }

      setShowLogin(false);
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const isSubmitDisabled =
    (currentState === "Sign Up" && (!data.name || Boolean(errors.name))) ||
    !data.email ||
    !data.password ||
    Boolean(errors.email) ||
    Boolean(errors.password);

  return (
    <div className="login-popup">
      <form
        onSubmit={onSubmitHandler}
        className={`login-popup-container ${
          currentState === "Sign Up" ? "signup-mode" : "login-mode"
        }`}
      >
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Sign Up" && (
            <>
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your name"
                required
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </>
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your password"
            required
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>
        <button type="submit" disabled={isSubmitDisabled}>
          {isLoggingIn || isRegistering
            ? "Processing..."
            : currentState === "Sign Up"
            ? "Create Account"
            : "Login"}
        </button>
        {currentState === "Log In" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Log In")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
