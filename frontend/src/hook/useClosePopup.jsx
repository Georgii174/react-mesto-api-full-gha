import { useEffect } from "react";

function useClosePopup( isOpen, handleClose) {

  function handleCloseOnOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
      handleClose();
    }
  }

  function handleCloseOnEsc(evt) {
    if (evt.key === 'Escape') {
      handleClose();
    }
  }

  useEffect(() => {
    isOpen && document.addEventListener('keydown', handleCloseOnEsc);
    return () => document.addEventListener('keydown', handleCloseOnEsc);
  });

  return {handleCloseOnOverlay}
}

export default useClosePopup
