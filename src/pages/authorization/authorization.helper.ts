const EMAIL_PATTERN = "/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/";
const USERNAME_PATTERN = "/^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/";
const PASSWORD_PATTERN = "/^[a-zA-Z0-9-_]{3,23}$/";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9-_]{7,23}$/;

export {
  EMAIL_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
  EMAIL_PATTERN,
  USERNAME_PATTERN,
  PASSWORD_PATTERN,
};
