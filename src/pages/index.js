import './index.css';

import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards, objectValidation } from '../components/massiv-foto.js';

const windowImage = new PopupWithImage('.popup_type_window')

// Функция создания карт
const createCard = (cardData) => {
  const card = new Card(cardData, '.template-card',  () => {
    windowImage.openPopup(cardData);
  });

  return card.generateCard();
}
// Функция создания секции
const cardsContainer = new Section({
  renderer: (card) => {
    cardsContainer.addItem(createCard(card));
  },
}, '.cards__ul'
);

// Отобразить карточки на странице
cardsContainer.renderItems(initialCards);

// Кнопки открытия Popup
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileOpenButtonAdd = document.querySelector('.profile__add-button');

// Получение данных из формы профиля
const userInfo = new UserInfo({
  selectorUserName: '.profile__name',
  selectorUserJob: '.profile__job'
})

// Функция создания Popup редактировапния профиля
const popuptypeProfile = new PopupWithForm('.popup_type_profile', {
  submitCallback: (data) => {
    userInfo.setUserInfo(data);
  }
})

// Функция открытия Popup редактирования профиля
popupProfileOpenButton.addEventListener('click', () => {
  popuptypeProfile.openPopup();
  popuptypeProfile.setInputValues(userInfo.getUserInfo());
  validatorForms['prfile__form'].clearValidationForm();
});

// Функция создания Popup добавления карточки
const popupFormAddCards = new PopupWithForm('.popup_type_card', {
  submitCallback: ({ link, title }) => {
    cardsContainer.addItem(createCard({
      name: title,
      link: link,
      alt: title,
    }))
  }
})

// Функция открытия Popup добавления Карточки Места
popupProfileOpenButtonAdd.addEventListener('click', () => {
  popupFormAddCards.openPopup();
  validatorForms['form-place'].clearValidationForm();
});

// Получение экземпляров класса
const validatorForms = {};

// Функция валидации
const enableValidation = (data) => {
  const listForm = Array.from(document.querySelectorAll(data.formSelector))
  listForm.forEach((formElement) => {
    const formValidator = new FormValidator(data, formElement);
    const formName = formElement.getAttribute('name');

    validatorForms[formName] = formValidator;
    formValidator.enableValidation();
  })
}

// Вызов функции валидации 
enableValidation(objectValidation);

// Слушатели
windowImage.setEventListeners();
popuptypeProfile.setEventListeners();
popupFormAddCards.setEventListeners();

