import * as authForm from "./authReducer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "features/authorization/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import API from "api";
import "./style/Login.css";
import Components from "components";
import { icons } from "images";

const Register = () => {
  //------------------------------
  const state = useSelector(authForm.selectForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  //------------------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!state.form.usernameValid) {
      dispatch(
        authForm.setFailure(
          "Username must start with a letter and  must be longer than 4 characters."
        )
      );
      return;
    }
    if (!state.form.emailValid) {
      dispatch(authForm.setFailure("Email is not correct"));
      return;
    }
    if (!state.form.passwordValid) {
      dispatch(authForm.setFailure("Password must be 8 characters or longer."));
      return;
    }
    if (!state.form.confirmPasswordValid) {
      dispatch(authForm.setFailure("Password confirm failed."));
      return;
    }
    dispatch(authForm.setRequesting(true));
    try {
      const res = await API.auth.register(
        state.form.email,
        state.form.username,
        state.form.password,
        state.form.passwordConfirm
      );
      localStorage.setItem("user", JSON.stringify(res));
      dispatch(login(res));
      dispatch(authForm.setRequesting(false));
      navigate(from, { replace: true });
    } catch (error: any) {
      dispatch(authForm.setFailure(error.response.data.message));
      console.log(error);
    }
  };

  return (
    <section className="si--page">
      {state.form.isRequesting ? <Components.Loading /> : null}
      <div className="si--container si--container-register">
        <Components.AnimatedLogo page="register" />
        <h1>Register</h1>
        {state.form.failure ? (
          <h3 className="login-failed">{state.form.failureMessage}</h3>
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
                state.form.username.length > 0
                  ? state.form.usernameValid
                    ? "si--username-input-valid"
                    : "si--username-input-invalid"
                  : ""
              }
              required
              value={state.form.username}
              onChange={(e) => {
                dispatch(authForm.setUsername(e.target.value));
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
                state.form.email.length > 0
                  ? state.form.emailValid
                    ? "si--username-input-valid"
                    : "si--username-input-invalid"
                  : ""
              }
              required
              value={state.form.email}
              onChange={(e) => {
                dispatch(authForm.setEmail(e.target.value));
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
                state.form.password.length > 0
                  ? state.form.passwordValid
                    ? "si--username-input-valid"
                    : "si--username-input-invalid"
                  : ""
              }
              required
              value={state.form.password}
              onChange={(e) => {
                dispatch(authForm.setPassword(e.target.value));
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
                state.form.passwordConfirm.length > 0
                  ? state.form.confirmPasswordValid
                    ? "si--username-input-valid"
                    : "si--username-input-invalid"
                  : ""
              }
              required
              value={state.form.passwordConfirm}
              onChange={(e) => {
                dispatch(authForm.setConfirmPassword(e.target.value));
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
