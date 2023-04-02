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
const addCardModal = document.querySelector("#add-card-modal");

// Buttons and Nodes
const editProfileButton = document.querySelector(".profile__button-edit");
const addCardButton = document.querySelector(".profile__button-add");
const profileModalCloseButton = editProfileModal.querySelector(".modal__button-close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__button-close");
const modalImageCloseButton = document.querySelector("#card-image-modal");
const cardsEl = document.querySelector(".cards");
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");
const cardImageModal = document.querySelector("#card-image-modal");
const modalImageEl = document.querySelector(".modal__image");
const modalImageCaptionEl = document.querySelector(".modal__image-caption");

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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = getCardElement({ name, link });
  cardsEl.prepend(cardElement);
  closeModal(addCardModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardNameEl = cardElement.querySelector(".card__name");
  const likeButton = cardElement.querySelector(".card__button-like");
  const trashCanButton = cardElement.querySelector(".card__trash-button");

  trashCanButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__button_active");
  });

  cardImageEl.addEventListener("click", () => {
    modalImageEl.src = data.link;
    modalImageCaptionEl.textContent = data.name;
    openModal(cardImageModal);
  });

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardNameEl.textContent = data.name;
  return cardElement;
}

// Event Listeners
editProfileButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
  openModal(editProfileModal);
});
addCardButton.addEventListener("click", () => openModal(addCardModal));

profileModalCloseButton.addEventListener("click", () => closeModal(editProfileModal));
addCardModalCloseButton.addEventListener("click", () => closeModal(addCardModal));
modalImageCloseButton.addEventListener("click", () => {
  closeModal(cardImageModal);
});

editProfileModal.addEventListener("submit", handleProfileFormSubmit);
addCardModal.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((eachCardData) => renderCard(eachCardData, cardsEl));
