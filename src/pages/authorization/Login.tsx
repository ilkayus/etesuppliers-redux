import * as authForm from "./authReducer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "features/authorization/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import API from "api";
import "./style/Login.css";
import Components from "components";
import { icons } from "images";

const Login = () => {
  //------------------------------
  const state = useSelector(authForm.selectForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  //------------------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!state.form.emailValid || !state.form.passwordValid) return;
    dispatch(authForm.setRequesting(true));
    try {
      const res = await API.auth.login(state.form.email, state.form.password);
      localStorage.setItem("user", JSON.stringify(res));
      dispatch(login(res));
      dispatch(authForm.setRequesting(false));
      navigate(from, { replace: true });
    } catch (error: any) {
      dispatch(authForm.setFailure());
      console.log(error);
    }
  };

  return (
    <section className="si--page">
      {state.form.isRequesting ? <Components.Loading /> : null}
      <div className="si--container si--container-login">
        <Components.AnimatedLogo page="login" />
        <h1>Login</h1>
        {state.form.failure ? (
          <h3 className="login-failed">{state.form.failureMessage}</h3>
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
