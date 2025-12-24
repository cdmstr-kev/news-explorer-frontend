import { useState, useCallback } from "react";

const useForm = (defaultValues) => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({ email: "" });
  const allFieldsFilled = Object.values(values).every((value) => value !== "");
  const isFormValid = allFieldsFilled && !errors.email;

  const handleChange = (e) => {
    const { value, name } = e.target;

    if (name === "email") {
      const isValid = e.target.validity.valid;
      if (!isValid && value !== "") {
        setErrors({
          ...errors,
          email: "Invalid email address",
        });
      } else setErrors({ ...errors, email: "" });
    }

    setValues({ ...values, [name]: value });
  };

  const resetForm = useCallback(() => {
    setValues(defaultValues);
    setErrors({ email: "" });
  }, [defaultValues]);

  return {
    values,
    handleChange,
    setValues,
    resetForm,
    isFormValid,
    errors,
    setErrors,
  };
};

export default useForm;
