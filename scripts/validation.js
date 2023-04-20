const formEl = document.querySelectorAll(".modal__form");
const formInputEl = formEl.querySelectorAll(".form__input");

function showInputError(formEl, formInputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${formInputEl.id}-error`);
  formInputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = formInputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, formInputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${formInputEl.id}-error`);
  formInputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

const checkInputValidity = (formEl, formInputEl, options) => {
  if (!formInputEl.validity.valid) {
    showInputError(formEl, formInputEl, options);
  } else {
    hideInputError(formEl, formInputEl, options);
  }
};

function toggleButtonState(inputElements, submitButton, { inactiveButtonClass }) {
  const foundInvalid = false;
  inputElements.forEach((input) => {
    if (!inputElements.validity.valid) {
      foundInvalid = true;
    }
  });
  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputElements = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelectorAll(".form__button");

  inputElements.forEach((formInputEl) => {
    formInputEl.addEventListener("input", (evt) => {
      checkInputValidity(formEl, formInputEl, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

enableValidation(config);
