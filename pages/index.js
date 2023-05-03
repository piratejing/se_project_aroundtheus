// import FormValidator from "./FormValidator.js";
import Card from "../components/Card.js";

import { openModal, closeModal } from "../utils/utils.js";

// export { cardImageModal, modalImageEl, modalImageCaptionEl };

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//-----------------------------------------------------------------------------------------------------

// const card = new Card(cardData, "#card-template");
// card.getView();
//-----------------------------------------------------------------------------------------------------

// const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");

// Edit
const editProfileModal = document.querySelector("#edit-modal");
const editForm = editProfileModal.querySelector("#edit-profile-form");
const editProfileButton = document.querySelector(".profile__button-edit");
const inputName = document.querySelector("#name");
const inputSubtitle = document.querySelector("#description");

// Add
const addCardButton = document.querySelector(".profile__button-add");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(".modal__button-close");
const cardTitleInput = document.querySelector("#title");
const cardUrlInput = document.querySelector("#image-link");
const addCardForm = document.querySelector("#add-card-form");

// Preview
export const cardImageModal = document.querySelector("#card-image-modal");
export const modalImageEl = document.querySelector(".modal__image");
export const modalImageCaptionEl = document.querySelector(".modal__image-caption");
const profileModalCloseButton = editProfileModal.querySelector(".modal__button-close");
const modalImageCloseButton = document.querySelector("#image-modal-close-button");

// Cards
const cardsEl = document.querySelector(".cards");

function renderCard(cardData, wrapper) {
  // const cardElement = getCardElement(cardData);

  const card = new Card(cardData, "#card-template").getView();
  // card.getView();
  wrapper.prepend(card);
}

// Edit Form
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closeModal(editProfileModal);
}
function handleEditProfileButtonClick() {
  fillProfileForm();
  openModal(editProfileModal);
}
function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
}

// Add Form
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const cardElement = document.getElementById("card-template");
  const cardNameLink = {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };
  renderCard(cardNameLink, cardsEl);

  event.target.reset();

  toggleButtonState(Array.from(addCardForm.querySelectorAll(config.inputSelector)), addCardForm.querySelector(config.submitButtonSelector), config);
  // addFormValidator.toggleButtonState();

  closeModal(addCardModal);
  cardsEl.prepend(cardElement);
}

// Event Listeners
editProfileButton.addEventListener("click", handleEditProfileButtonClick);

editProfileModal.addEventListener("submit", handleProfileFormSubmit);
addCardModal.addEventListener("submit", handleAddCardFormSubmit);

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

profileModalCloseButton.addEventListener("click", () => closeModal(editProfileModal));
addCardModalCloseButton.addEventListener("click", () => closeModal(addCardModal));
modalImageCloseButton.addEventListener("click", () => {
  closeModal(cardImageModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardsEl));

// Data

// const validationOptions = {
//   Selector: ".modal__form",
//   inputSelector: ".form__input",
//   submitButtonSelector: ".form__button",
//   inactiveButtonClass: "form__button_disabled",
//   inputErrorClass: "form__input_type_error",
//   errorClass: "form__error_visible",
// };

// const editFormValidator = new FormValidator(validationOptions, editProfileModal);
// const addCardFormValidator = new FormValidator(validationOptions, addCardModal);
// editFormValidator.enableValidation();
// addCardFormValidator.enableValidation();

// Functions

// function openModal(modal) {
//   modal.classList.add("modal_open");
//   document.addEventListener("keydown", closeModalEsc);
// }

// function closeModal(modal) {
//   modal.classList.remove("modal_open");
//   document.removeEventListener("keydown", closeModalEsc);
// }

// function closeModalEsc(evt) {
//   if (evt.key === "Escape") {
//     const openedModal = document.querySelector(".modal_open");
//     closeModal(openedModal);
//   }
// }

// function closeModalClick(modal, evt) {
//   if (evt.target === modal) {
//     closeModal(modal);
//   }
// }

// editProfileModal.addEventListener("click", (evt) => {
//   closeModalClick(editProfileModal, evt);
// });
// addCardModal.addEventListener("click", (evt) => {
//   closeModalClick(addCardModal, evt);
// });
// cardImageModal.addEventListener("click", (evt) => {
//   closeModalClick(cardImageModal, evt);
// });

//-----------------------------------------------------------------------------------------------------

// function getCardElement(data) {
//   const cardElement = cardTemplate.cloneNode(true);
//   // const cardImageEl = cardElement.querySelector(".card__image");
//   // const cardNameEl = cardElement.querySelector(".card__name");
//   // const likeButton = cardElement.querySelector(".card__button-like");
//   // const trashCanButton = cardElement.querySelector(".card__trash-button");

//   // trashCanButton.addEventListener("click", () => {
//   //   cardElement.remove();
//   // });

//   // likeButton.addEventListener("click", () => {
//   //   likeButton.classList.toggle("card__button_active");
//   // });

//   // cardImageEl.addEventListener("click", () => {
//   //   modalImageEl.src = data.link;
//   //   modalImageEl.alt = data.name;
//   //   modalImageCaptionEl.textContent = data.name;
//   //   openModal(cardImageModal);
//   // });

//   // cardImageEl.src = data.link;
//   // cardImageEl.alt = data.name;
//   // cardNameEl.textContent = data.name;
//   // return cardElement;
// }
//-----------------------------------------------------------------------------------------------------
