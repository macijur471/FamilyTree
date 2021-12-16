import { AxiosError } from "axios";

export const isAxiosError = <T = any>(
  err: AxiosError | Error
): err is AxiosError<T> => {
  if ((err as AxiosError<T>).isAxiosError) return true;
  else return false;
};
