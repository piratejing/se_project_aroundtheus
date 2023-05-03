function showInputError(formEl, formInputEl, options) {
  const errorMessageEl = formEl.querySelector(`#${formInputEl.id}-error`);
  formInputEl.classList.add(options.inputErrorClass);
  errorMessageEl.textContent = formInputEl.validationMessage;
  errorMessageEl.classList.add(options.errorClass);
}

function hideInputError(formEl, formInputEl, options) {
  const errorMessageEl = formEl.querySelector(`#${formInputEl.id}-error`);
  formInputEl.classList.remove(options.inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(options.errorClass);
}

function checkInputValidity(formEl, formInputEl, options) {
  if (!formInputEl.validity.valid) {
    return showInputError(formEl, formInputEl, options);
  }
  hideInputError(formEl, formInputEl, options);
}

function hasInvalidInput(inputElements) {
  return !inputElements.every((formInputEl) => formInputEl.validity.valid);
}

function toggleButtonState(inputElements, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputElements)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputElements = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(options.submitButtonSelector);

  toggleButtonState(inputElements, submitButton, options);

  inputElements.forEach((formInputEl) => {
    formInputEl.addEventListener("input", () => {
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

const formEl = document.querySelectorAll(config.formSelector);
const formInputEl = document.querySelectorAll(config.inputSelector);
