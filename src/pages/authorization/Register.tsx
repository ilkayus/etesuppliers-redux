import { useReducer } from "react";
import { authReducer, initialState } from "./authReducer";
import { useNavigate, useLocation } from "react-router-dom";
import API from "api";
import useAuth from "hooks/useAuth";
import "./style/Login.css";
import Components from "components";
import { icons } from "images";

const Register = () => {
  //------------------------------
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  //------------------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      !state.emailValid ||
      !state.passwordValid ||
      !state.usernameValid ||
      !state.confirmPasswordValid
    )
      return;
    dispatch({ type: "setRequesting", payload: true });
    try {
      const res = await API.auth.register(
        state.email,
        state.username,
        state.password,
        state.passwordConfirm
      );
      setAuth(res);
      localStorage.setItem("user", JSON.stringify(res));
      dispatch({ type: "setRequesting", payload: false });
      navigate(from, { replace: true });
    } catch (error: any) {
      dispatch({ type: "setFailure", payload: error.response.statusText });
      console.log(error);
    }
  };

  return (
    <section className="si--page">
      {state.isRequesting ? <Components.Loading /> : null}
      <div className="si--container si--container-register">
        <Components.AnimatedLogo page="register" />
        <h1>Register</h1>
        {state.failure ? (
          <h3 className="login-failed">{state.failureMessage}</h3>
        ) : null}
        <form method="post" onSubmit={handleSubmit}>
          <label htmlFor="username" className="username username-register">
            <span className="username-icon">
              <img src={icons.user} alt="username icon" />
            </span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="off"
              className={
                state.username.length > 0
                  ? state.usernameValid
                    ? "si--username-input-valid"
                    : "si--username-input-invalid"
                  : ""
              }
              required
              value={state.username}
              onChange={(e) => {
                dispatch({
                  type: "username",
                  payload: e.target.value,
                });
              }}
            />
          </label>
          <label htmlFor="email" className="username">
            <span className="username-icon">
              <img src={icons.envelop} alt="email icon" />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              className={
                state.email.length > 0
                  ? state.emailValid
                    ? "si--username-input-valid"
                    : "si--username-input-invalid"
                  : ""
              }
              required
              value={state.email}
              onChange={(e) => {
                dispatch({
                  type: "email",
                  payload: e.target.value,
                });
              }}
            />
          </label>
          <label htmlFor="password" className="username">
            <span className="username-icon">
              <img src={icons.lockOpen} alt="password icon" />
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={
                state.password.length > 0
                  ? state.passwordValid
                    ? "si--username-input-valid"
                    : "si--username-input-invalid"
                  : ""
              }
              required
              value={state.password}
              onChange={(e) => {
                dispatch({
                  type: "password",
                  payload: e.target.value,
                });
              }}
            />
          </label>
          <label
            htmlFor="passwordConfirm"
            className="username username-register"
          >
            <span className="username-icon">
              <img src={icons.envelop} alt="password icon" />
            </span>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              className={
                state.passwordConfirm.length > 0
                  ? state.confirmPasswordValid
                    ? "si--username-input-valid"
                    : "si--username-input-invalid"
                  : ""
              }
              required
              value={state.passwordConfirm}
              onChange={(e) => {
                dispatch({
                  type: "passwordConfirm",
                  payload: e.target.value,
                });
              }}
            />
          </label>
          <button type="submit" className="submit-button">
            <p>Register</p>
            <img src={icons.rightArrow} alt="sing in submit icon" />
          </button>
          <span className="create-account">
            <p>Do you have an account?</p>
            <button
              type="button"
              className="create-account-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </span>
        </form>
      </div>
    </section>
  );
};

export default Register;
