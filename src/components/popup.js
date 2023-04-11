export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._buttonClose = this._popup.querySelector('.popup__button-close')
    }
  
    // Общая функция открытия popup
    openPopup() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClosePopup)
    }
  
    // Общая функция закрытия popup
    closePopup() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClosePopup)
    }
  
    // Функция закрытия по клавише Esc
    _handleEscClosePopup = (evt) => {
      if (evt.key === 'Escape') {
        this.closePopup();
      }
    }
  
    // Закрытие всех popup при нажатии на Overlay 
    _handleOverlayClosePopup = (evt) => {
      if (evt.target === evt.currentTarget) {
        this.closePopup();
      };
    }
  
    // Слушатели 
    setEventListeners() {
      this._buttonClose.addEventListener('click', () => {
        this.closePopup();
      });
      this._popup.addEventListener('mousedown', this._handleOverlayClosePopup);
    }
  };
  