export default class FormValidator {
  constructor(validationOptions, formElement) {
    this._formSelector = ".modal__form";
    this._inputSelector = ".form__input";
    this._submitButtonSelector = ".form__button";
    this._inactiveButtonClass = "form__button_disabled";
    this._inputErrorClass = "form__input_type_error";
    this._errorClass = "form__error_visible";

    this._form = formELement;

    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));

    this._saveButton = this._form.querySelector(this._submitButtonSelector);
  }
  _showInputError(formInputEl) {
    const errorMessageEl = this._form.querySelector(`#${formInputEl.id}-error`);
    formInputEl.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = formInputEl.validationMessage;
    this._errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(formInputEl) {
    this._errorMessageEl = this._form.querySelector(`#${formInputEl.id}-error`);
    formInputEl.classList.remove(this._inputErrorClass);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(this._errorClass);
  }
  _hasInvalidInput() {
    return !this._inputElements.every((formInputEl) => formInputEl.validity.valid);
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._saveButton.classList.add(this._inactiveButtonClass);
      this._saveButton.disabled = true;
      return;
    }
    this._saveButton.classList.remove(this._inactiveButtonClass);
    this._saveButton.disabled = false;
  }

  _checkInputValidity(formInputEl) {
    if (!formInputEl.validity.valid) {
      this._showInputError(formInputEl);
    }
    this._hideInputError(formInputEl);
  }

  _setEventListeners() {
    this._inputElements.forEach((formInputEl) => {
      formInputEl.addEventListener("input", () => {
        this._checkInputValidity(formInputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    this._toggleButtonState();
  }
}
