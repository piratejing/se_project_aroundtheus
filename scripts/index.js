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

const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");
const profileModalCloseButton = document.querySelector("#edit-modal-close-button");
const addImageModalCloseButton = document.querySelector("#add-modal-close-button");
const editProfileModal = document.querySelector("#edit-modal");
const addModal = document.querySelector("#add-modal");
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");
const inputName = document.querySelector("#name");
const inputSubtitle = document.querySelector("#description");
const cardsEl = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

function openModal(modal) {
  modal.classList.add("modal-open");
}

function closeModal(modal) {
  modal.classList.remove("modal-open");
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closeModal(editProfileModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardNameEl = cardElement.querySelector(".card__name");
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

initialCards.forEach((data) => {
  const cardData = getCardElement(data);
  cardsEl.append(cardData);
});
