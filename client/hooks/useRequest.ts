import axios, { AxiosError } from "axios";
import { useState } from "react";

type useRequestProps = {
  url: string;
  method: string;
  body?: any;
  onSuccess?: (prop?: any) => void;
};

type ResponseError = {
  errors: {
    message: string;
  }[];
};

export const useRequest = ({
  url,
  method,
  body,
  onSuccess,
}: useRequestProps) => {
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const doRequest = async (props: any = {}) => {
    try {
      const response = await axios({
        url,
        method,
        data: { ...body, ...props },
      });

      setErrors([]);
      onSuccess && onSuccess(response.data);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as Error | AxiosError<ResponseError>;
        if (axios.isAxiosError(error)) {
          setErrors(error?.response?.data?.errors || []);
        }
      }
    }
  };

  return {
    errors,
    doRequest,
  };
};
