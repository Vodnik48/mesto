class Card {
    constructor(card, templateSelector, handleCardClic) {
      this._name = card.name;
      this._link = card.link;
      this._templateSelector = templateSelector;
      this._handleCardClic = handleCardClic;
    };
  
    // Получить шаблон 
    _getTemplate() {
      const cardItem = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
  
      return cardItem;
    };
  
    // Сгенерировать карточку 
    generateCard() {
      this._cardItem = this._getTemplate();
      this._cardTitle = this._cardItem.querySelector('.card__title');
      this._cardPhoto = this._cardItem.querySelector('.card__image');
      this._cardLike = this._cardItem.querySelector('.card__like');
      this._cardDel = this._cardItem.querySelector('.card__delete-button');
  
      this._cardTitle.textContent = this._name;
      this._cardPhoto.src = this._link;
      this._cardPhoto.alt = this._name;
  
      this._setEventListeners();
  
      return this._cardItem;
    };
  
    // Функция лайк-дизлайка карточки 
    _likeCard() {
      this._cardLike.classList.toggle('card__like_active');
    };
  
    // Функция удаления карточки 
    _deliteCard() {
      this._cardItem.remove();
      this._cardItem = null;
    };

    //Слушатели событий 
    _setEventListeners() {
      this._cardLike.addEventListener('click', () => this._likeCard());
      this._cardDel.addEventListener('click', () => this._deliteCard());
      this._cardPhoto.addEventListener('click', () =>
        this._handleCardClic({
          link: this._link,
          name: this._name,
        }));
    };
  };
  
  export { Card };
  
  