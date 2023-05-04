import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal } from "../utils/utils.js";

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

// Variables
const userAuthor = document.querySelector(".profile__author");
const userDescription = document.querySelector(".profile__subtitle");

// Edits
const editProfileModal = document.querySelector("#edit-modal");
const editForm = editProfileModal.querySelector("#edit-profile-form");
const editProfileButton = document.querySelector(".profile__edit-button");
const modalEditName = document.querySelector(".form__input_type_name");
const modalEditDescription = document.querySelector(".form__input_type_description");

//Adds
const addButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close-button");
const modalEditTitle = document.querySelector(".form__input_type_title");
const modalEditUrl = document.querySelector(".form__input_type_url");
const addCardForm = addCardModal.querySelector("#add-card-form");

// Saves
const saveButton = document.querySelector("form__save-button");
const closeEditModalButton = editProfileModal.querySelector(".modal__close-button");

// Picture Popup
export const previewModal = document.querySelector("#modal__popup");
export const previewImg = document.querySelector(".modal__popup-img");
export const previewTitle = document.querySelector(".modal__popup-title");
const previewCloseButton = previewModal.querySelector(".modal__close-button");

//Validation
const config = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

// Enable Validation
const editFormValidator = new FormValidator(config, editForm);

editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, addCardForm);

addFormValidator.enableValidation();

// Cards
const cardListEl = document.querySelector(".cards");

// Functions
function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template").getView();
  wrapper.prepend(card);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  userAuthor.textContent = modalEditName.value;
  userDescription.textContent = modalEditDescription.value;
  closeModal(editProfileModal);
}
function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const name = modalEditTitle.value;
  const link = modalEditUrl.value;
  renderCard({ name, link }, cardListEl);

  event.target.reset();
  addFormValidator.toggleButtonState();

  closeModal(addCardModal);
}

// Event Listeners
editProfileModal.addEventListener("submit", handleProfileFormSubmit);
addCardModal.addEventListener("submit", handleAddCardFormSubmit);

// Button Open/Close
editProfileButton.addEventListener("click", () => {
  modalEditName.value = userAuthor.innerText;
  modalEditDescription.value = userDescription.innerText;
  openModal(editProfileModal);
});
closeEditModalButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});
addButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});
previewCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

initialCards.forEach((cardData) => {
  renderCard(cardData, cardListEl);
});
