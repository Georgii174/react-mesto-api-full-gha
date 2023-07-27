import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useValidation from "../hook/useValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const { enteredValue, errors, isFormValid, handleChange, resetForm } = useValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser)
    }
  }, [currentUser, resetForm, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: enteredValue.name,
      about: enteredValue.about,
    });
  }

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профель'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={onLoading ? `Сохранение` : `Сохранить`}
      onLoading={onLoading}
      isDisabled={!isFormValid}>

      <input type="text" className={errors.name ? "popup__input popup__input_name_block" : "popup__input"}
        id="name-input" name="name"
        placeholder="Имя" minLength="2" maxLength="40" required
        onChange={handleChange}
        value={enteredValue.name || ''} />
      <span className="popup__error popup__error_visible name-input-error">{errors.name}</span>

      <input type="text" className={errors.about ? "popup__input popup__input_text_block" : "popup__input"}
        id="job-input" name="about"
        placeholder="Вид деятельности" minLength="2" maxLength="200" required
        onChange={handleChange}
        value={enteredValue.about || ''} />
      <span className="popup__error popup__error_visible job-input-error">{errors.about}</span>

    </PopupWithForm>
  )
}

export default EditProfilePopup
