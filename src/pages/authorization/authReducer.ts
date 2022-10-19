import * as helper from "./authorization.helper";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

const initialState = {
  form: {
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
  },
};

const authReducer = createSlice({
  name: "authFormReducer",
  initialState,
  reducers: {
    validateInputRegister: (state) => {
      state.form.inputsValidRegister =
        state.form.emailValid &&
        state.form.usernameValid &&
        state.form.passwordValid &&
        state.form.confirmPasswordValid;
    },
    validateInputLogin: (state) => {
      state.form.inputsValidRegister =
        state.form.emailValid && state.form.passwordValid;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.form.email = action.payload;
      state.form.emailValid = helper.EMAIL_REGEX.test(action.payload);
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.form.username = action.payload;
      state.form.usernameValid = helper.USERNAME_REGEX.test(action.payload);
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.form.password = action.payload;
      state.form.passwordValid = helper.PASSWORD_REGEX.test(action.payload);
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.form.passwordConfirm = action.payload;
      state.form.confirmPasswordValid = state.form.password === action.payload;
    },
    setRequesting: (state, action: PayloadAction<boolean>) => {
      state.form.isRequesting = action.payload;
      state.form.failure = false;
    },
    setFailure: (state) => {
      state.form.isRequesting = false;
      state.form.failure = true;
    },
  },
});

export const {
  validateInputRegister,
  validateInputLogin,
  setEmail,
  setUsername,
  setPassword,
  setConfirmPassword,
  setRequesting,
  setFailure,
} = authReducer.actions;
export const selectForm = (state: RootState) => state.form;
export default authReducer.reducer;

// type AuthActionTypes =
//   | { type: "validateInputsRegister"; payload: undefined }
//   | { type: "validateInputsLogin"; payload: undefined }
//   | { type: "email"; payload: string }
//   | { type: "username"; payload: string }
//   | { type: "password"; payload: string }
//   | { type: "passwordConfirm"; payload: string }
//   | { type: "setRequesting"; payload: boolean }
//   | { type: "setFailure"; payload: any };

// const authReducer1 = (state: typeof initialState, action: AuthActionTypes) => {
//   switch (action.type) {
//     case "validateInputsRegister":
//       return {
//         ...state,
//         inputsValidRegister:
//           helper.EMAIL_REGEX.test(state.email) &&
//           helper.USERNAME_REGEX.test(state.username) &&
//           helper.PASSWORD_REGEX.test(state.password) &&
//           state.passwordConfirm === state.password,
//       };
//     case "validateInputsLogin":
//       return {
//         ...state,
//         inputsValidLogin:
//           helper.EMAIL_REGEX.test(state.email) &&
//           helper.PASSWORD_REGEX.test(state.password),
//       };
//     case "email":
//       return {
//         ...state,
//         email: action.payload,
//         emailValid: helper.EMAIL_REGEX.test(action.payload),
//       };
//     case "username":
//       return {
//         ...state,
//         username: action.payload,
//         usernameValid: helper.USERNAME_REGEX.test(action.payload),
//       };
//     case "password":
//       return {
//         ...state,
//         password: action.payload,
//         passwordValid: helper.PASSWORD_REGEX.test(action.payload),
//       };
//     case "passwordConfirm":
//       return {
//         ...state,
//         passwordConfirm: action.payload,
//         confirmPasswordValid: state.password === action.payload,
//       };

//     case "setRequesting":
//       return {
//         ...state,
//         isRequesting: action.payload,
//         failure: false,
//       };
//     case "setFailure":
//       return {
//         ...state,
//         isRequesting: false,
//         failure: true,
//         // failureMessage: action.payload,
//       };
//     default:
//       throw new Error(`Invalid authentication state.`);
//   }
// };
