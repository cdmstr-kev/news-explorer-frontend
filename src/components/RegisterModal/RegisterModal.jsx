import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.js";
import "./RegisterModal.css";
import { checkUserInStorage } from "../../utils/helpers.js";

const RegisterModal = ({
  isOpen,
  handleCloseActiveModal,
  onUserRegister,
  setIsLoading,
  handleOpenSignIn,
}) => {
  const defaultValues = {
    email: "",
    password: "",
    username: "",
  };

  const { values, handleChange, resetForm, errors, setErrors, isFormValid } =
    useForm(defaultValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    const usernameExists = checkUserInStorage(values.email);

    if (usernameExists && values.email !== "") {
      setErrors({ ...errors, email: "Email already exists" });
    } else {
      setIsLoading(true);
      onUserRegister(values);
      resetForm();
      setIsLoading(false);
      handleCloseActiveModal();
    }
  };

  return (
    <div>
      <ModalWithForm
        isFormValid={isFormValid}
        isOpen={isOpen}
        title={"Sign Up"}
        onSubmit={handleSubmit}
        name={"register-modal"}
        buttonText={"Sign Up"}
        handleCloseActiveModal={handleCloseActiveModal}
        footerButton={
          <button
            type="button"
            className="modal__switch"
            onClick={handleOpenSignIn}
          >
            or <span className={"modal__switch_color-blue"}>Sign in</span>
          </button>
        }
      >
        <fieldset className="modal__fieldset">
          <label htmlFor="registration-email" className="modal__label">
            Email
            <input
              id="registration-email"
              className="modal__input"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={values.email}
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <fieldset className="modal__fieldset">
          <label htmlFor="registration-password" className="modal__label">
            Password
            <input
              id="registration-password"
              className="modal__input"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </label>
        </fieldset>

        <fieldset className="modal__fieldset">
          <label htmlFor="user-name" className="modal__label">
            Username
            <input
              id="user-name"
              className="modal__input"
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </label>
        </fieldset>
        {errors.email && (
          <span className={"register__error"}>{errors.email}</span>
        )}
      </ModalWithForm>
    </div>
  );
};
export default RegisterModal;
