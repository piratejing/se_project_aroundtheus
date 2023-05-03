import { openModal } from "../utils/utils.js";

import { cardImageModal, modalImageEl, modalImageCaptionEl } from "../pages/index.js";

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
    const likeButton = this._cardEl.querySelector(".card__button-like");
    const deleteButton = this._cardEl.querySelector(".card__trash-button");
    const cardImageEl = this._cardEl.querySelector(".card__image");

    likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    cardImageEl.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _handleLikeIcon() {
    this._cardElement.querySelector(".card__button-like").classList.toggle("card__button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handleCardClick() {
    modalImageEl.src = this._link;
    modalImageEl.alt = this._name;
    modalImageCaptionEl.textContent = this._name;
    openModal(cardImageModal);
  }

  getView() {
    this._cardElement = this._getTemplate;
    this._setEventListeners();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").src = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._cardElement;
    //return the card
  }
}
