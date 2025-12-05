import { useState } from "react";

const UseForm = (defaultValues) => {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const resetForm = () => {
    setValues(defaultValues);
  };

  return { values, handleChange, setValues, resetForm };
};
export default UseForm;
