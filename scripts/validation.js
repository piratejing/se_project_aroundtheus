const formEl = document.querySelectorAll(".modal__form");
const formInputEl = document.querySelectorAll(".form__input");

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
  // let foundInvalid = false;
  // inputElements.forEach((input) => {
  //   if (!inputElements.validity.valid) {
  //     foundInvalid = true;
  //   }
  // });
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
  const submitButton = formEl.querySelector(".form__button");

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

// const formElement = document.querySelectorAll(".modal__form");
// const inputElement = document.querySelectorAll(".form__input");

// function showInputError(formElement, inputElement, options) {
//   const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(options.inputErrorClass);
//   errorMessageElement.textContent = inputElement.validationMessage;
//   errorMessageElement.classList.add(options.errorClass);
// }

// function hideInputError(formElement, inputElement, options) {
//   const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(options.inputErrorClass);
//   errorMessageElement.textContent = "";
//   errorMessageElement.classList.remove(options.errorClass);
// }

// function checkInputValidity(formElement, inputElement, options) {
//   if (!inputElement.validity.valid) {
//     return showInputError(formElement, inputElement, options);
//   }
//   hideInputError(formElement, inputElement, options);
// }

// function hasInvalidInput(inputList) {
//   return !inputList.every((inputElement) => inputElement.validity.valid);
// }

// // FIXME:
// // function disableButton(button, {inactiveButtonClass}) {
// //   button.classList.remove(inactiveButtonClass);
// //   button.disabled = false;
// // }
// // function enableButton(button) {
// //   button.classList.add(inactiveButtonClass);
// //   button.disabled = false;
// // }

// function toggleButtonState(inputElements, submitButton, { inactiveButtonClass }) {
//   if (hasInvalidInput(inputElements)) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.disabled = true;
//     return;
//   }
//   submitButton.classList.remove(inactiveButtonClass);
//   submitButton.disabled = false;
// }

// function setEventListeners(formElement, options) {
//   const { inputSelector } = options;
//   const inputElements = [...formElement.querySelectorAll(inputSelector)];
//   const submitButton = formElement.querySelector(".form__button");
//   inputElements.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       checkInputValidity(formElement, inputElement, options);
//       toggleButtonState(inputElements, submitButton, options);
//     });
//   });
// }

// function enableValidation(options) {
//   const formElements = [...document.querySelectorAll(options.formSelector)];
//   formElements.forEach((formElement) => {
//     formElement.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, options);
//   });
// }

// const config = {
//   formSelector: ".modal__form",
//   inputSelector: ".form__input",
//   submitButtonSelector: ".form__button",
//   inactiveButtonClass: "form__button_disabled",
//   inputErrorClass: "form__input_type_error",
//   errorClass: "form__error_visible",
// };

// enableValidation(config);
