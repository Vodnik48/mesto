import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { initialCards, objectValidation } from './massiv-foto.js';

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
// инициализация карточек
const cardsList = document.querySelector('.cards__ul')
// добавление карточек
const popupFormCard = popupTypeCard.querySelector('.popup__form_type_card');
const formtitle = popupTypeCard.querySelector('.popup__input_type_title')
const formlink = popupTypeCard.querySelector('.popup__input_type_link')
// popupZoom
const popupZoomImage = document.querySelector('.popup_type_window')
const windowImage = document.querySelector('.popup__window-image')
const popupZoomTitle = document.querySelector('.popup__zoom-title')
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
// Функция создания карт
const createCard = (cardData) => {
  const card = new Card(cardData, '.template-card', setbindCardPreviewListener);

  return card.generateCard();
};

// Функция открытия просмотра изображения карточки
const setbindCardPreviewListener = (cardImageElement) => {
     openPopup(popupZoomImage);
    windowImage.src = cardImageElement.link;
    popupZoomTitle.textContent = cardImageElement.name;
};

// Создание карточек из массива
initialCards.forEach((cardData) => {
  cardsList.append(createCard(cardData));
});
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
    validationFormProfile.clearValidationForm();
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
    openPopup(popupTypeCard);
    formtitle.value = '';
    formlink.value = '';
    validationFormPlace.clearValidationForm();
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

// Валидация форм 
const validationFormProfile = new FormValidator(objectValidation, formProfile);
validationFormProfile.enableValidation();

const validationFormPlace = new FormValidator(objectValidation, popupFormCard);
validationFormPlace.enableValidation();
