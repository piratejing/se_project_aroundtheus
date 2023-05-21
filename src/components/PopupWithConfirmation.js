import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._confirmButton = this._modalElement.querySelector("#delete-button");
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  renderLoading(isDeleting, text) {
    if (isDeleting) {
      this._confirmButton.textContent = "Deleting...";
    } else {
      this._confirmButton.textContent = text;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
  }
}
