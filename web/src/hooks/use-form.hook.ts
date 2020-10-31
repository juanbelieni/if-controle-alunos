import { useState } from 'react';

export type Errors<T> = { [field in keyof T]?: boolean };

export default function useForm<T extends { [field: string]: any }>(
  initialValues: T,
  validate: (values: T, errors: Errors<T>) => Errors<T>,
  submit: (values: T) => void,
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});

  function handleChange(field: keyof T, value: T[keyof T]) {
    setValues((values) => ({
      ...values,
      [field]: value,
    }));
  }

  function handleSubmit() {
    const errors = validate(values, {});
    setErrors(errors);

    for (const error in errors) {
      if (error) {
        return;
      }
    }

    submit(values);
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}
