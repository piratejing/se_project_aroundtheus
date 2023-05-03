import { openModal } from "../utils/utils.js";

import { previewModal, previewImg, previewTitle } from "../pages/index.js";

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    const deleteButton = this._cardElement.querySelector(".card__trash-button");
    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardNameEl = this._cardElement.querySelector(".card__title");

    likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    cardImageEl.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  // HANDLERS
  _handleLikeIcon() {
    this._cardElement.querySelector(".card__like-button").classList.toggle("card__like-button_active");
  }
  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  _handleCardClick() {
    openModal(previewModal);
    previewImg.src = this._link;
    previewImg.alt = `Photo of ${this._name}`;
    previewTitle.textContent = this._name;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._cardElement;
  }
}
