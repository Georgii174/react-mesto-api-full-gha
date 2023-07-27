function InfoTooltip({ isOpen, onClose, title, path}) {

  return (
    <div className={`popup popup_info ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img className="popup__success-images" src={path} alt={path} />
        <h2 className="popup__success-title">{title}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip

