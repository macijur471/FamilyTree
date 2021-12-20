const MAX_LENGTH_MSSG = (field: string, value: number) =>
  `${field} cannot be more than ${value} characters long!`;

const MIN_LENGTH_MSSG = (field: string, value: number) =>
  `${field} cannot be less than ${value} characters long!`;

export const FULLNAME_MAX_LENGTH = 50;
export const FULLNAME_MAX_LENGTH_MSSG = MAX_LENGTH_MSSG(
  "Full name",
  FULLNAME_MAX_LENGTH
);

export const FULLNAME_MIN_LENGTH = 5;
export const FULLNAME_MIN_LENGTH_MSSG = MIN_LENGTH_MSSG(
  "Full name",
  FULLNAME_MIN_LENGTH
);

export const FULLNAME_PATTERN = /^([a-z0-9]+\s)+.+$/i;
export const FULLNAME_PATTERN_MSSG = "Please enter a name and a surname!";

export const HOMETOWN_MAX_LENGTH = 50;
export const HOMETOWN_MAX_LENGTH_MSSG = MAX_LENGTH_MSSG(
  "Hometown",
  HOMETOWN_MAX_LENGTH
);

export const HOMETOWN_MIN_LENGTH = 3;
export const HOMETOWN_MIN_LENGTH_MSSG = MIN_LENGTH_MSSG(
  "Hometown",
  HOMETOWN_MIN_LENGTH
);

export const JOB_MAX_LENGTH = 50;
export const JOB_MAX_LENGTH_MSSG = MAX_LENGTH_MSSG("Job", JOB_MAX_LENGTH);

export const JOB_MIN_LENGTH = 5;
export const JOB_MIN_LENGTH_MSSG = MIN_LENGTH_MSSG("Job", JOB_MIN_LENGTH);
