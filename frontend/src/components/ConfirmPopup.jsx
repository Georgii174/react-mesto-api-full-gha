import React from "react";
import PopupWithForm from "./PopupWithForm";


function ConfirmPopup({isOpen, onClose, onSubmit, card}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
        name='confirm'
        title='Вы уверены?'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonText={'Да'}>

      </PopupWithForm>
  )
}

export default ConfirmPopup
