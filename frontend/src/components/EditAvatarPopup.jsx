import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useValidation from "../hook/useValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const { enteredValue, errors, isFormValid, handleChange, resetForm } = useValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: enteredValue.avatar
    });
  }

  useEffect(() => {
    resetForm()
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={onLoading ? `Обновление` : `Обновить`}
      onLoading={onLoading}
      isDisabled={!isFormValid}>

      <input type="url" className={errors.avatar ? "popup__input popup__input_link_avatar" : "popup__input"}
        id="avatar-input" name="avatar"
        placeholder="Ссылка на аватарку" required
        value={enteredValue.avatar || ''} onChange={handleChange} />
      <span className="popup__error popup__error_visible avatar-input-error">{errors.avatar}</span>

    </PopupWithForm>
  )
}

export default EditAvatarPopup
