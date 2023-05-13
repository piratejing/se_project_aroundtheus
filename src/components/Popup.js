export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = popupSelector;
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
    this._popupElement.addEventListener(
      "mousedown",
      this._closeModalOnRemoteClick
    );
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
    this._popupElement.removeEventListener(
      "mousedown",
      this._closeModalOnRemoteClick
    );
  }

  _handleEscClose = (evt) => {
    evt.preventDefault();
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _closeModalOnRemoteClick = (evt) => {
    if (evt.target.classList.contains("modal")) {
      this.close();
    }
  };

  setEventListeners() {
    this._popupElement
      .querySelector(".modal__close")
      .addEventListener("click", () => this.close());
  }
}
