import { toast } from "react-toastify";
import { isAxiosError } from "utils/typeGuards/isAxiosError.guard";

export const handleErrorMssg = (err: Error, toastId: string) => {
  if (isAxiosError<{ message: string }>(err)) {
    toast.error(err.response?.data.message, { toastId });
  } else {
    toast.error(err.message, { toastId });
  }
};
