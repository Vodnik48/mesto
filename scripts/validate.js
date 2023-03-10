// Объект валидации 
const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Функция валидации всех форм 
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    form.addEventListener('input', () => {
      toggleButton(form, config);
    });

    addInputListners(form, config);
    toggleButton(form, config);
  });
}

// Функция вывода сообщения вылидации 
const handleFormInput = (evt, config) => {
  const input = evt.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);

  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass)
    errorElement.textContent = '';
  } else {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }
}

// Функция переключения кнопки submit
const toggleButton = (form, config) => {
  const buttonSubmint = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();

  buttonSubmint.disabled = !isFormValid;
  buttonSubmint.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

// Объявляю функцию слушателей всех инпутов 
const addInputListners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  inputList.forEach(function (item) {
    item.addEventListener('input', (evt) => {
      handleFormInput(evt, config)
    })
  });
}
// Вызов функции и предача объекта как аргумента
enableValidation(formValidationConfig);