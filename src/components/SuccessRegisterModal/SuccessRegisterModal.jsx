import ModalWithForm from "../ModalWithForm/ModalWithForm";

const SuccessRegister = ({ handleSigninClick, isOpen, handleCloseClick }) => {
  return (
    <ModalWithForm
      title={"Registration successfully completed!"}
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
    >
      <button
        type="button"
        onClick={handleSigninClick}
        className="modal__registration-success"
      >
        <span>Sign in</span>
      </button>
    </ModalWithForm>
  );
};

export default SuccessRegister;
