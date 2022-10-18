import { useReducer } from "react";
import { authReducer, initialState } from "./authReducer";
import { useNavigate, useLocation } from "react-router-dom";
import API from "api";
import useAuth from "hooks/useAuth";
import "./style/Login.css";
import Components from "components";
import { icons } from "images";

const Login = () => {
  //------------------------------
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  //------------------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!state.emailValid || !state.passwordValid) return;
    dispatch({ type: "setRequesting", payload: true });
    try {
      const res = await API.auth.login(state.email, state.password);
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
      <div className="si--container si--container-login">
        <Components.AnimatedLogo page="login" />
        <h1>Login</h1>
        {state.failure ? (
          <h3 className="login-failed">{state.failureMessage}</h3>
        ) : null}
        <form method="post" onSubmit={handleSubmit}>
          <label htmlFor="username" className="username">
            <span className="username-icon">
              <img src={icons.envelop} alt="username icon" />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
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
          <button type="submit" className="submit-button">
            <p>Sign In</p>
            <img src={icons.rightArrow} alt="sing in submit icon" />
          </button>
          <span className="create-account">
            <p>Do you need an account?</p>
            <button
              type="button"
              className="create-account-button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </span>
        </form>
      </div>
    </section>
  );
};

export default Login;
