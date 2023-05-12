import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imageModal = this._popupElement.querySelector(".modal__popup-img");
    this._imageModalName = this._popupElement.querySelector(".modal__popup-title");
  }

  open({ name, link }) {
    this._imageModal.src = link;
    this._imageModal.alt = name;
    this._imageModalName.textContent = name;

    super.open();
  }
}
