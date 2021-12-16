const MAX_LENGTH_MSSG = (field: string, value: number) =>
  `${field} cannot be more than ${value} characters long!`;

const MIN_LENGTH_MSSG = (field: string, value: number) =>
  `${field} cannot be less than ${value} characters long!`;

export const USERNAME_MAX_LENGTH = 30;
export const USERNAME_MAX_LENGTH_MSSG = MAX_LENGTH_MSSG(
  "Username",
  USERNAME_MAX_LENGTH
);

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MIN_LENGTH_MSSG = MIN_LENGTH_MSSG(
  "Username",
  USERNAME_MIN_LENGTH
);

export const PASSWD_MAX_LENGTH = 50;
export const PASSWD_MAX_LENGTH_MSSG = MAX_LENGTH_MSSG(
  "Password",
  PASSWD_MAX_LENGTH
);

export const PASSWD_MIN_LENGTH = 8;
export const PASSWD_MIN_LENGTH_MSSG = MIN_LENGTH_MSSG(
  "Password",
  PASSWD_MIN_LENGTH
);

export const REQUIRED_MSSG = "This field is required!";
