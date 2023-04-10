import popup from '../components/popup.js'

class PopupWithImage extends popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgCard = this._popup.querySelector('.popup__window-image');
    this._nameCard = this._popup.querySelector('.popup__zoom-title');
  }

  // Открываем попуп с внесением данных 
  openPopup(image) {
    super.openPopup();
    this._imgCard.src = image.link;
    this._imgCard.alt = image.name;
    this._nameCard.textContent = image.name
  }

};

export { PopupWithImage };
