import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalwithForm";

const RegisterModal = ({
  isOpen,
  handleCloseClick,
  handleSigninClick,
  onSignup,
  handleSuccessRegistration,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSignup(data);
    handleSuccessRegistration();
  };
  return (
    <ModalWithForm
      title="Sign Up"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          id="register-modal-email"
          className="modal__input"
          placeholder="Email"
          required
          value={data.email}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          id="register-modal-password"
          className="modal__input"
          placeholder="Enter password"
          required
          value={data.password}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Enter your username
        <input
          type="text"
          name="name"
          className="modal__input"
          id="register-modal-username"
          placeholder="Enter your username"
          value={data.name}
          onChange={handleChange}
        />
      </label>
      <div className="modal__button-container">
        <button
          type="submit"
          className="modal__button modal__button_type_primary"
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={handleSigninClick}
          className="modal__button modal__button_type_secondary"
        >
          or <span>Sign in</span>
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
