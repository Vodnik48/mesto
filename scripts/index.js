
//Открытие_Закрытие формы проф
const closeButton = document.querySelector('.popup__button-close');
const popuptypeProfile = document.querySelector('.popup_type_profile');
const editButton = document.querySelector('.profile__edit-button');
//Ред_Проф.
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_profile_name');
const jobInput = formElement.querySelector('.popup__input_profile_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// Открытие_Закрытие формы для доб. карточек 
const popupTypeCard = document.querySelector('.popup_type_card');
const openButtonAdd = document.querySelector('.profile__add-button');
const closeButtonAdd = document.querySelector('.popup__add-close');
// инициализация карточек
const tempalate = document.querySelector('.template').content;
const cards = document.querySelector('.cards');
const cardsList = cards.querySelector('.cards__ul');
// добавление карточек
const title = document.querySelector('.popup__input_type_title');
const link = document.querySelector('.popup__input_type_link');
const containerAdd = document.querySelector('.popup__container_add');
// popupZoom
const popupZoomImage = document.querySelector('.popup_type_window');
const windowImage = document.querySelector('.popup__window-image');
const popupZoomTitle = document.querySelector('.popup__zoom-title');
const closeButtonWindow = document.querySelector('.popup__window-close')

function closePopup (element) {
    element.classList.remove('popup_opened');
  }
function openPopup (element) {
    element.classList.add('popup_opened');
  }
const openPopupEditTypeProfile = () => {
    openPopup(popuptypeProfile);
    const name = profileName.textContent;
    const job = profileJob.textContent;
    nameInput.value = name;
    jobInput.value = job;
}
function submiteEditForm(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popuptypeProfile);
}
function createCard(nameValue, linkValue) {
    const cardItem = tempalate.querySelector('.card').cloneNode(true);
    cardItem.querySelector('.card__title').textContent = nameValue;
    cardItem.querySelector('.card__delete-button').addEventListener('click', function (){
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
    elementsList.append(addCardNew);
});   
function submiteCreateForm(evt) {
    evt.preventDefault();
    const addCardNew = createCard(title.value, link.value);
    evt.target.reset();
    elementsList.prepend(addCardNew);
    closePopup(popupTypeCard);
};    
closeButtonWindow.addEventListener('click', () => { closePopup(popupZoomImage)});
containerAdd.addEventListener('submit', submiteCreateForm);
formElement.addEventListener('submit', submiteEditForm); 
editButton.addEventListener('click', openPopupEditTypeProfile);
closeButton.addEventListener('click', () => { closePopup(popuptypeProfile)});
openButtonAdd.addEventListener('click', () => { openPopup(popupTypeCard)});
closeButtonAdd.addEventListener('click', () => { closePopup(popupTypeCard)});
