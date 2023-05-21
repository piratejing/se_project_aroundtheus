//import { debug } from "webpack";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._modalElement = document.querySelector(popupSelector);
    this._modalImage = this._modalElement.querySelector(
      ".modal__preview-image"
    );
    this._modalTitle = this._modalElement.querySelector(
      ".modal__preview-footer"
    );
  }
  open(cardImageEl, cardTitleEl) {
    super.open();
    this._modalImage.src = cardImageEl.src;
    this._modalImage.name = cardImageEl.alt;
    this._modalTitle.textContent = cardTitleEl.textContent;
  }
  close() {
    super.close();
  }
}
