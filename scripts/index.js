// Объект валидации 
const objectValidation = {
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
  }
//Открытие_Закрытие формы проф
const popupProfilecloseButton = document.querySelectorAll('.popup__button-close');
const popuptypeProfile = document.querySelector('.popup_type_profile');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
//Ред_Проф.
const formProfile = popuptypeProfile.querySelector('.popup__form_type_profile');
const nameInput = document.querySelector('.popup__input_profile_name');
const jobInput = document.querySelector('.popup__input_profile_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Открытие_Закрытие формы для доб. карточек 
const popupTypeCard = document.querySelector('.popup_type_card');
const popupProfileOpenButtonAdd = document.querySelector('.profile__add-button');
const popupProfilecloseButtonAdd = document.querySelector('.popup__add-close')
// инициализация карточек
const cardTemplate = document.querySelector('.template-card').content
const cards = document.querySelector('.cards')
const cardsList = cards.querySelector('.cards__ul')
// добавление карточек
const popupFormCard = popupTypeCard.querySelector('.popup__form_type_card');
const formtitle = popupTypeCard.querySelector('.popup__input_type_title')
const formlink = popupTypeCard.querySelector('.popup__input_type_link')
const containerAdd = document.querySelector('.popup__container_add')
// popupZoom
const popupZoomImage = document.querySelector('.popup_type_window')
const windowImage = document.querySelector('.popup__window-image')
const popupZoomTitle = document.querySelector('.popup__zoom-title')
const popupProfilecloseButtonWindow = document.querySelector('.popup__window-close')

// Границы окна Popup 
const popupClosest = document.querySelectorAll('.popup');

// Общая функция закрытия Popup
function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscClosePopup);
}

// Общая функция открытия Popup
function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscClosePopup);
};
// Функция закрытия по клавише Esc
const handleEscClosePopup = (evt) => {
  if (evt.key === 'Escape') {
    const popupClose = document.querySelector('.popup_opened');
    closePopup(popupClose);
  };
};

// Функция лайк-дизлайка карточки
const setCardLikeListener = (buttonLike) => {
  buttonLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  });
};

// Функция удаления карточки
const setCardDeleteListener = (cardData) => {
  cardData.addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });
};

// Функция создания карт
const createCard = (cardData) => {
  const cardItem = cardTemplate.cloneNode(true);
  const cardTitle = cardItem.querySelector('.card__title');                   
  const cardPhoto = cardItem.querySelector('.card__image');                   
  const cardLike = cardItem.querySelector('.card__like');                 
  const cardDel = cardItem.querySelector('.card__delete-button'); 
  
  cardTitle.textContent = cardData.name;
  cardPhoto.src = cardData.link;
  cardPhoto.alt = cardData.alt ?? cardData.name;
  
  setbindCardPreviewListener(cardPhoto);                                          
  setCardLikeListener(cardLike);                                              
  setCardDeleteListener(cardDel);

  return cardItem;
};

// Функция открытия просмотра изображения карточки
const setbindCardPreviewListener = (cardImageElement) => {
  cardImageElement.addEventListener('click', (evt) => {
    openPopup(popupZoomImage);

    windowImage.src = cardImageElement.src;
    windowImage.alt = cardImageElement.alt ?? cardImageElement.name;
    popupZoomTitle.textContent = evt.target.closest('.card').textContent;
  });
};

// Создание карточек из массива
initialCards.forEach((cardData) => {
  cardsList.append(createCard(cardData));
});

// Функция сброса общих стилей при открытии Popup
const resetValidationStyle = (objectValidation) => {
    disableSubmitInput(objectValidation);
    disableSubmitButton(objectValidation);
  };
  // Функция валидации строки ввода 
const disableSubmitInput = (objectValidation) => {
    const inputList = document.querySelectorAll(objectValidation.inputSelector);
  
    inputList.forEach((input) => {
      input.classList.remove(objectValidation.inputErrorClass);
      input.nextElementSibling.textContent = '';
    });
  }
// Функция валидации кнопки Submit 
const disableSubmitButton = (objectValidation) => {
    const buttonSubmint = document.querySelectorAll(objectValidation.submitButtonSelector);
  
    buttonSubmint.forEach((button) => {
      button.classList.add(objectValidation.inactiveButtonClass);
      button.setAttribute('disabled', '');
    });
  }

// Функция сохранения внесенных в формы popup изменений при закрытии окна
formProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popuptypeProfile);
});

// Функция открытия Popup редактирования профиля
popupProfileOpenButton.addEventListener('click', () => {
    openPopup(popuptypeProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    resetValidationStyle(objectValidation);
});

// Закрытие всех Popup при нажатии на крестик 
popupProfilecloseButton.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const popupClosestCross = popupAddClosest(evt);
    closePopup(popupClosestCross);

  });
});
// Закрытие всех Popup при нажатии на Overlay 
popupClosest.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      const popupClosestOverlay = popupAddClosest(evt);
      closePopup(popupClosestOverlay);
    };
  });
});

// Функция открытия Popup добавления Карточки Места
popupProfileOpenButtonAdd.addEventListener('click', () => { 
    openPopup(popupTypeCard)
    resetValidationStyle(objectValidation); 
    
    formtitle.value = '';
    formlink.value = '';
});

//Функция сохранения внесенных в формы popup данных
popupFormCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
  
    renderCard({
      name: formtitle.value,
      link: formlink.value,
    });
  
    evt.target.reset();
    closePopup(popupTypeCard);
  });
// Функция добавления новой карточки в начало блока
const renderCard = (card) => {
  cardsList.prepend(createCard(card));
};
// Функция возвращения события 
const popupAddClosest = (evt) => {
  return evt.target.closest('.popup');
};