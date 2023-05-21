class Card {
  constructor(data, userId, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  getCardElement() {
    this._cardElement = this._getView();

    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardTitleEl.textContent = this._name;

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__delete-button");

    this._cardLikes = this._cardElement.querySelector(".card__likes-counter");
    this._renderLikes();

    if (this._userId != this._ownerId) {
      this._deleteButton.remove();
    }
    this._setEventListeners();

    return this._cardElement;
  }
  _setEventListeners() {
    this._cardImageEl.addEventListener("click", () => {
      this._handleCardClick(this._cardImageEl, this._cardTitleEl);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id);
    });
  }

  deleteCard() {
    this._cardElement.remove();
    this.cardElement = null;
  }

  _addLikes() {
    this._likeButton.classList.add("card__like-button_active");
  }

  _removeLikes() {
    this._likeButton.classList.remove("card__like-button_active");
  }

  setLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  _renderLikes() {
    this._cardLikes.textContent = this._likes.length;

    if (this.isLiked()) {
      return this._addLikes();
    } else {
      return this._removeLikes();
    }
  }

  _getView() {
    return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
  }
}

export default Card;
