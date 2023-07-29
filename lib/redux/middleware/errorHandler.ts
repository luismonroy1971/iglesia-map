import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const getErrorMessage = (action: any) =>
  action?.msg || "Sorry, we've encountered an error.";
export const rtkQueryErrorLogger =
  (api: any) => (next: any) => (action: any) => {
    if (isRejectedWithValue(action)) {
      const { data } = action.payload;
      const errorMessage = getErrorMessage(data);
      toast.error(errorMessage);
    }

    return next(action);
  };
