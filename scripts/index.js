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
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

const editProfileModal = document.querySelector("#edit-modal");
const addModal = document.querySelector("#add-modal");
const addCard = document.querySelector("#add-card-form");

// Buttons and Nodes
const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");
const profileModalCloseButton = editProfileModal.querySelector(".modal__button-close");
const addImageModalCloseButton = addModal.querySelector(".modal__button-close");
const cardsEl = document.querySelector(".cards");
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");

// Data
const inputName = document.querySelector("#name");
const inputSubtitle = document.querySelector("#description");
const cardTitleInput = document.querySelector("#title");
const cardUrlInput = document.querySelector("#image-link");

// Functions
function openModal(modal) {
  modal.classList.add("modal-open");
}

function closeModal(modal) {
  modal.classList.remove("modal-open");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = getCardElement({ name, link });
  cardsEl.prepend(cardElement);
  closeModal(addModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardNameEl = cardElement.querySelector(".card__name");
  const likeButton = cardElement.querySelector(".card__button-like");

  // Event Listeners
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__button_active");
  });

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardNameEl.textContent = data.name;
  return cardElement;
}

editButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
  openModal(editProfileModal);
});

addButton.addEventListener("click", () => openModal(addModal));

profileModalCloseButton.addEventListener("click", () => closeModal(editProfileModal));
addImageModalCloseButton.addEventListener("click", () => closeModal(addModal));

editProfileModal.addEventListener("submit", handleProfileFormSubmit);
addModal.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((data) => renderCard(data, cardsEl));
