import "./ModalWithForm.css";
import closebutton from "../../assets/close.svg";

const ModalWithForm = ({
  handleCloseClick,
  isOpen,
  title,
  children,
  onSubmit,
}) => {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={closebutton} alt="modal close button" />
        </button>
        <form onSubmit={onSubmit} className="modal__form" noValidate>{children}</form>
      </div>
    </div>
  );
};

export default ModalWithForm;