import { AxiosError } from "axios";

export const isDeleteError = (
  err: AxiosError | AxiosError<{ error: string }>
): err is AxiosError<{ error: string }> => {
  if ((err as AxiosError<{ error: string }>)?.response?.data.error) return true;
  else return false;
};
