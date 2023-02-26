// Объект валидации 
const objectValidation = {
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
  }
//Открытие_Закрытие формы проф
const closeButton = document.querySelector('.popup__button-close')
const popuptypeProfile = document.querySelector('.popup_type_profile')
const editButton = document.querySelector('.profile__edit-button')
//Ред_Проф.
const formElement = popuptypeProfile.querySelector('.popup__form_type_profile')
const nameInput = document.querySelector('.popup__input_profile_name')
const jobInput = document.querySelector('.popup__input_profile_job')
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')

// Открытие_Закрытие формы для доб. карточек 
const popupTypeCard = document.querySelector('.popup_type_card')
const openButtonAdd = document.querySelector('.profile__add-button')
const closeButtonAdd = document.querySelector('.popup__add-close')
// инициализация карточек
const template = document.querySelector('#template').content
const cards = document.querySelector('.cards')
const cardsList = cards.querySelector('.cards__ul')
// добавление карточек
const popupFormCard = popupTypeCard.querySelector('.popup__form_type_card');
const title = popupTypeCard.querySelector('.popup__input_type_title')
const link = popupTypeCard.querySelector('.popup__input_type_link')
const containerAdd = document.querySelector('.popup__container_add')
// popupZoom
const popupZoomImage = document.querySelector('.popup_type_window')
const windowImage = document.querySelector('.popup__window-image')
const popupZoomTitle = document.querySelector('.popup__zoom-title')
const closeButtonWindow = document.querySelector('.popup__window-close')
// Границы окна Popup 
const popupClosest = document.querySelectorAll('.popup');

// Общая функция закрытия Popup
function closePopup(element) {
    element.classList.remove('popup_opened');
}
// Общая функция открытия Popup
function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscClosePopup);
};
// Функция создания карт
function createCard(nameValue, linkValue) {
    const cardItem = template.querySelector('.card').cloneNode(true);
    cardItem.querySelector('.card__title').textContent = nameValue;
    cardItem.querySelector('.card__delete-button').addEventListener('click', function () {
        cardItem.remove();
    });
    cardItem.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active');
    });
    const cardimage = cardItem.querySelector('.card__image');
    cardimage.src = linkValue;
    cardimage.alt = nameValue;
    cardimage.addEventListener('click', (evt) => {
        openPopup(popupZoomImage);
        const windowCard = evt.target;
        windowImage.src = windowCard.src;
        windowImage.alt = nameValue;
        popupZoomTitle.textContent = nameValue;
    });
    return cardItem;
};
initialCards.forEach((card) => {
    const addCardNew = createCard(card.name, card.link);
    cardsList.append(addCardNew);
});
function submiteCreateForm(evt) {
    evt.preventDefault();
    const addCardNew = createCard(title.value, link.value);
    evt.target.reset();
    cardsList.prepend(addCardNew);
    closePopup(popupTypeCard);
};

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

containerAdd.addEventListener('submit', submiteCreateForm);

// Функция сохранения внесенных в формы popup изменений при закрытии окна
formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popuptypeProfile);
});

// Функция открытия Popup редактирования профиля
editButton.addEventListener('click', () => {
    openPopup(popuptypeProfile);
    const name = profileName.textContent;
    const job = profileJob.textContent;
    nameInput.value = name;
    jobInput.value = job;
    resetValidationStyle(objectValidation);
});



// Функция открытия Popup добавления Карточки Места
openButtonAdd.addEventListener('click', () => { 
    openPopup(popupTypeCard)
    resetValidationStyle(objectValidation); 
    
    title.value = '';
    link.value = '';
});
popupFormCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
  
    renderCard({
      name: title.value,
      link: link.value,
    });
  
    evt.target.reset();
    closePopup(popupTypeCard);
  });
// Закрытие всех Popup при нажатии на крестик 
closeButton.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const popupClosestCross = popupAddClosest(evt);
    closePopup(popupClosestCross);
  });
});
// Закрытие всех Popup при нажатии на Overlay 
popupClosest.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      const popupClosestOverlay = popupAddClosest(evt);
      closePopup(popupClosestOverlay);
    };
  });
});


// Функция возвращения события 
const popupAddClosest = (evt) => {
  return evt.target.closest('.popup');
};