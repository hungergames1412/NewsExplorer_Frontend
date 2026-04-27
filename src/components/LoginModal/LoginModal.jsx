import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalwithForm";

const LoginModal = ({
  isOpen,
  handleCloseClick,
  handleSignin,
  handleSignupClick,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await handleSignin(data);
      handleCloseClick();
    } catch (err) {
      console.error("Login failed:", err);
      setErrors({ general: "Incorrect email or password" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalWithForm
      onSubmit={handleSubmit}
      title="Sign in"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          id="login-modal-email"
          className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
          placeholder="Enter your email"
          required
          value={data.email}
          onChange={handleChange}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          id="login-modal-password"
          className={`modal__input ${
            errors.password ? "modal__input_error" : ""
          }`}
          placeholder="Enter your password"
          required
          value={data.password}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>

      {errors.general && <span className="modal__error">{errors.general}</span>}

      <div className="modal__button-container">
        <button
          className={`modal__button modal__button_type_primary ${
            data.email.trim() && data.password.trim()
              ? "modal__button_type_logged"
              : ""
          }`}
          type="submit"
          disabled={isSubmitting || !data.email.trim() || !data.password.trim()}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>

        <button
          onClick={handleSignupClick}
          type="button"
          className="modal__button modal__button_type_secondary"
        >
          or <span>Sign Up</span>
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
