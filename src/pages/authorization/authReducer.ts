import * as helper from "./authorization.helper";

type AuthActionTypes =
  | { type: "validateInputsRegister"; payload: undefined }
  | { type: "validateInputsLogin"; payload: undefined }
  | { type: "email"; payload: string }
  | { type: "username"; payload: string }
  | { type: "password"; payload: string }
  | { type: "passwordConfirm"; payload: string }
  | { type: "setRequesting"; payload: boolean }
  | { type: "setFailure"; payload: any };

const initialState = {
  inputsValidRegister: false,
  inputsValidLogin: false,
  emailValid: false,
  usernameValid: false,
  passwordValid: false,
  confirmPasswordValid: false,
  email: "",
  username: "",
  password: "",
  passwordConfirm: "",
  isRequesting: false,
  failure: false,
  failureMessage: "Something went wrong",
};

const authReducer = (state: typeof initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case "validateInputsRegister":
      return {
        ...state,
        inputsValidRegister:
          helper.EMAIL_REGEX.test(state.email) &&
          helper.USERNAME_REGEX.test(state.username) &&
          helper.PASSWORD_REGEX.test(state.password) &&
          state.passwordConfirm === state.password,
      };
    case "validateInputsLogin":
      return {
        ...state,
        inputsValidLogin:
          helper.EMAIL_REGEX.test(state.email) &&
          helper.PASSWORD_REGEX.test(state.password),
      };
    case "email":
      return {
        ...state,
        email: action.payload,
        emailValid: helper.EMAIL_REGEX.test(action.payload),
      };
    case "username":
      return {
        ...state,
        username: action.payload,
        usernameValid: helper.USERNAME_REGEX.test(action.payload),
      };
    case "password":
      return {
        ...state,
        password: action.payload,
        passwordValid: helper.PASSWORD_REGEX.test(action.payload),
      };
    case "passwordConfirm":
      return {
        ...state,
        passwordConfirm: action.payload,
        confirmPasswordValid: state.password === action.payload,
      };

    case "setRequesting":
      return {
        ...state,
        isRequesting: action.payload,
        failure: false,
      };
    case "setFailure":
      return {
        ...state,
        isRequesting: false,
        failure: true,
        // failureMessage: action.payload,
      };
    default:
      throw new Error(`Invalid authentication state.`);
  }
};

export { authReducer, initialState };
