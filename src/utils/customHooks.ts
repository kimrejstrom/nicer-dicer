import { useState } from 'react';
import { useLocation } from 'react-router-dom';

// A custom hook that builds on useLocation to parse
// the query string for you.
export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export type InputsFor<T> = { [key in keyof T]: string | number | undefined };

// A custom hook to handle controlled forms
export const useForm = (callback: () => void, existingInputs?: any) => {
  const [inputs, setInputs] = useState(existingInputs);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    callback();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    e.persist();
    setInputs((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};
