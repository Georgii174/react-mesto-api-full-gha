import {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import useValidation from "../hook/useValidation";


function AddPlacePopup({isOpen, onClose, onAddPlace, onLoading}) {
  const { enteredValue, errors, isFormValid, handleChange, resetForm } = useValidation();

  useEffect(() => {
    resetForm()
  }, [resetForm, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: enteredValue.name,
      link: enteredValue.link,
    });
  }

  return (
    <PopupWithForm
        name='addCard'
        title='Новое место'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonText={onLoading ? `Сохранение` : `Добавить`}
        onLoading={onLoading}
        isDisabled={!isFormValid}>

          <input type="text" className={errors.name ? "popup__input popup__input_name_card" : "popup__input"}
          id="nameCard-input" name="name"
            placeholder="Название" minLength="2" maxLength="30" required
            onChange={handleChange}
            value={enteredValue.name || ''} />
          <span className="popup__error popup__error_visible nameCard-input-error">{errors.name}</span>

          <input type="url" className={errors.link ?"popup__input popup__input_link_card" : "popup__input"}
          id="linkCard-input" name="link"
            placeholder="Ссылка на картинку" required
            onChange={handleChange}
            value={enteredValue.link || ''} />
          <span className="popup__error popup__error_visible linkCard-input-error">{errors.link}</span>

      </PopupWithForm>
  )

}

export default AddPlacePopup
