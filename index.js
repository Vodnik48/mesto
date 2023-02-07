const popup = document.querySelector('.popup');
const closeButton = popupElement.querySelector(".popup__button-close");
const editButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".form__profile-name");
const jobInput = formElement.querySelector(".form__profile-job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const openPopup = function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupElement.classList.add("popup_opened");
    };

popupEdit.addEventListener('click', (evt) => {
    evt.preventDefault();
    popup.classList.add('.popup_opened')
})
popupClose.addEventListener('click',() => {
    evt.preventDefault();
    popup.classList.remove('.popup_opened')
})  

editButton.addEventListener("click", openPopup);

const closePopup = function () {
    popupElement.classList.remove("popup_opened");
    };
    
    closeButton.addEventListener("click", closePopup);
    




    function formSubmitHandler(evt) {
        evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;
        closePopup();
        }
        
        formElement.addEventListener("submit", formSubmitHandler);


/*let formElement = document.querySelector('.popup__container');

let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let buttonSave = document.querySelector('.popup__button');*/