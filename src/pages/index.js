import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  formConfiguration,
  cardSelector,
  profileEditModal,
  profileName,
  profileJob,
  profileForm,
  addCardModal,
  addCardForm,
  previewImageModal,
  galleryCards,
} from "../utils/constants.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const userInfo = new UserInfo({
  userNameSelector: profileName,
  userJobSelector: profileJob,
});

const userInfoPopup = new PopupWithForm({
  popupSelector: profileEditModal,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});

const imagePreviewPopup = new PopupWithImage(previewImageModal);

function createCard(data) {
  const cardElement = new Card(
    {
      cardData: data,
      handleImageClick: () => {
        imagePreviewPopup.open(data);
      },
    },
    cardSelector
  );

  return cardElement.generateCard();
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);

      cardList.addItem(card);
    },
  },
  galleryCards
);

const newCardPopup = new PopupWithForm({
  popupSelector: addCardModal,
  handleFormSubmit: (data) => {
    const card = createCard(data);

    cardList.addItem(card);
  },
});

userInfoPopup.setEventListeners();
imagePreviewPopup.setEventListeners();
newCardPopup.setEventListeners();

cardList.renderItems();

const editFormValidator = new FormValidator(formConfiguration, profileForm);
const addCardFormValidator = new FormValidator(formConfiguration, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

profileEditButton.addEventListener("click", () => {
  const currentUserinfo = userInfo.getUserInfo();
  userInfoPopup.setInputValues(currentUserinfo);

  editFormValidator.resetValidation();
  userInfoPopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  newCardPopup.open();
});
