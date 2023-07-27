import { useCallback, useState } from "react";

const useValidation = () => {
  const [enteredValue, setEnteredValue] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    setEnteredValue({
      ...enteredValue,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: evt.target.ValidationMessage,
    });

    setIsFormValid(evt.target.closest(".popup__form").checkValidity());
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setEnteredValue(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setEnteredValue, setErrors, setIsFormValid]
  )

  return {
    enteredValue,
    errors,
    isFormValid,
    handleChange,
    resetForm,
  }
}

export default useValidation
