import React, {
  useState,
  useContext,
  useEffect
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  AuthContext
} from "../context/AuthContext";

import "../style/login.css";

const Login = () => {

  const navigate =
    useNavigate();

  const { login } =
    useContext(
      AuthContext
    );

  const [
    formData,
    setFormData
  ] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [mode,
    setMode] =
    useState("login");

  const [error,
    setError] =
    useState("");

  const [success,
    setSuccess] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [
    showPassword,
    setShowPassword
  ] = useState(false);

  useEffect(() => {

    const savedEmail =
      localStorage.getItem(
        "rememberedEmail"
      );

    if (savedEmail) {

      setFormData(
        (prev) => ({
          ...prev,
          email:
            savedEmail,
          rememberMe:
            true
        })
      );
    }
  }, []);

  const handleChange =
    (e) => {

      const {
        name,
        value,
        type,
        checked
      } = e.target;

      setFormData(
        (prev) => ({
          ...prev,
          [name]:
            type ===
            "checkbox"
              ? checked
              : value
        })
      );

      setError("");
      setSuccess("");
    };

  const handleLoginSuccess =
    (data) => {

      const user =
        data.user ||
        data;

      const token =
        data.token ||
        "";

      if (token) {
        localStorage.setItem(
          "token",
          token
        );
      }

      localStorage.setItem(
        "user",
        JSON.stringify(
          user
        )
      );

      if (
        formData.rememberMe
      ) {

        localStorage.setItem(
          "rememberedEmail",
          formData.email
        );

      } else {

        localStorage.removeItem(
          "rememberedEmail"
        );
      }

      login(
        user,
        token
      );

      navigate(
        "/dashboard"
      );
    };

  const handleLoginSubmit =
    async (e) => {

      e.preventDefault();

      setError("");
      setLoading(true);

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/auth/login",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify(
                  {
                    email:
                      formData.email,
                    password:
                      formData.password
                  }
                )
            }
          );

        const data =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            data.message ||
            "Invalid email or password"
          );
        }

        handleLoginSuccess(
          data
        );

      } catch (err) {

        if (
          err.message ===
          "Failed to fetch"
        ) {

          setError(
            "Backend server start karo (Port 5000)"
          );

        } else {

          setError(
            err.message
          );
        }

      } finally {

        setLoading(
          false
        );
      }
    };

  const handleEmailLogin =
    async (e) => {

      e.preventDefault();

      setError("");
      setSuccess("");
      setLoading(true);

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/auth/login-with-email",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify(
                  {
                    email:
                      formData.email
                  }
                )
            }
          );

        const data =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            data.message ||
            "Email not found"
          );
        }

        setSuccess(
          "✅ Email verified!"
        );

        setTimeout(
          () => {
            handleLoginSuccess(
              data
            );
          },
          1000
        );

      } catch (err) {

        if (
          err.message ===
          "Failed to fetch"
        ) {

          setError(
            "Backend server start karo (Port 5000)"
          );

        } else {

          setError(
            err.message
          );
        }

      } finally {

        setLoading(
          false
        );
      }
    };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-brand">
          <div className="login-brand-icon">
            F
          </div>

          <span>
            FewShop
          </span>
        </div>

        <div className="login-tabs">

          <button
            type="button"
            className={`login-tab ${
              mode ===
              "login"
                ? "active"
                : ""
            }`}
            onClick={() => {
              setMode(
                "login"
              );
              setError("");
              setSuccess("");
            }}
          >
            🔑 Login
          </button>

          <button
            type="button"
            className={`login-tab ${
              mode ===
              "forgot"
                ? "active"
                : ""
            }`}
            onClick={() => {
              setMode(
                "forgot"
              );
              setError("");
              setSuccess("");
            }}
          >
            📧 Email Login
          </button>

        </div>

        <h2 className="login-title">

          {mode ===
          "login"
            ? "Welcome Back!"
            : "Login with Email"}

        </h2>

        <p className="login-sub">

          {mode ===
          "login"
            ? "Enter credentials to continue"
            : "Enter registered email"}

        </p>

        {error && (
          <div className="login-alert error">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="login-alert success">
            {success}
          </div>
        )}

        {mode ===
          "login" && (
          <form
            onSubmit={
              handleLoginSubmit
            }
            className="login-form"
          >

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              required
            />

            <label>

              <input
                type="checkbox"
                name="rememberMe"
                checked={
                  formData.rememberMe
                }
                onChange={
                  handleChange
                }
              />

              Remember Me

            </label>

            <button
              type="submit"
              disabled={
                loading
              }
            >
              {loading
                ? "Loading..."
                : "Login"}
            </button>

          </form>
        )}

        {mode ===
          "forgot" && (
          <form
            onSubmit={
              handleEmailLogin
            }
            className="login-form"
          >

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
            />

            <button
              type="submit"
              disabled={
                loading
              }
            >
              {loading
                ? "Loading..."
                : "Continue"}
            </button>

          </form>
        )}

        <div className="login-footer">
          <p>
            No account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
};

export default Login;