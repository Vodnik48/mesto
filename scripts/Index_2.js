const popupElement = document.querySelector('.popup');
const popupImage = document.querySelector('.popup__image');
const popupCloseButton = document.querySelector('.popup__close');

class Card {
  constructor(templateSelector) {
    this._templateSelector = templateSelector;
}

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  

  _handleOpenPopup() {
    popupImage.src = this._image;
    popupElement.classList.add('popup_is-opened');
  }

  _handleClosePopup() {
    popupImage.src = '';
    popupElement.classList.remove('popup_is-opened');
  }

  _setEventListeners() {
    this._element.addEventListener('click', () => {
      this._handleOpenPopup();
    });

    popupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    });
  }
}

class DefaultCard extends Card {
  constructor(data, templateSelector) {
    super(templateSelector);
    this._title = data.title;
    this._description = data.description;
   // this._price = data.price;
    this._image = data.image;
    this._templateSelector = templateSelector;
  }
}

 generateCard() {
    this._element = super._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').style.backgroundImage = url(${this._image});
    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__info').textContent = this._description;
    // this._element.querySelector('.card__price-property').textContent = this._price;

    return this._element;
  }

class HorizontalCard extends Card {
  constructor(data, templateSelector) {
    super(templateSelector);
    this._title = data.title;
    this._description = data.description;
    this._price = data.price;
    this._image = data.image;
    //this._templateSelector = templateSelector;
  }
}

 generateCard() {
    this._element = super._getTemplate();
    super._setEventListeners();

    this._element.querySelector('.card__image').style.backgroundImage = url(${this._image});
    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__info').textContent = this._description;
    this._element.querySelector('.card__price-property').textContent = this._price;

    return this._element;
  }

items.forEach((item) => {
  const card = new HorizontalCard(item, '.horizontal-card');
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.card-list__items').append(cardElement);
});
