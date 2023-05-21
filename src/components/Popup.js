import { ESC_KEYCODE } from "../utils/constant";

export default class Popup {
  constructor({ popupSelector }) {
    this._modalElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.which === ESC_KEYCODE) {
      this.close();
    }
  }
  setEventListeners() {
    this._modalElement.addEventListener("mousedown", (evt) => {
      this._closeModalOnRemoteClick(evt);
    });
  }
  _closeModalOnRemoteClick(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains("modal__close-button")) {
      this.close();
    }
  }
}
