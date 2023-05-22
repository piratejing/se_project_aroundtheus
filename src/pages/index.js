import "../pages/index.css";
import Card from "../components/Card.js";
import Api from "../utils/api.js";

import FormValidator from "../components/formValidator.js";

import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import {
  initialCards,
  profileEditButton,
  profileEditModal,
  profileTitle,
  profileDescription,
  profileDescriptionInput,
  profileTitleInput,
  profileEditForm,
  previewModal,
  previewImage,
  previewFooter,
  cardListEl,
  cardTemplate,
  addCardButton,
  cardEditModal,
  avatarModal,
  avatarButton,
  deleteCard,
  avatarModalForm,
  cardModalCloseButton,
  cardTitleInput,
  cardUrlInput,
  config,
} from "../utils/constant";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "647a8f04-5b88-450f-8780-5fd992cd87e1",
    "Content-Type": "application/json",
  },
});

const editFormElement = profileEditModal.querySelector(".modal__form");
const addFormElement = cardEditModal.querySelector(".modal__form");
const avatarFormEl = avatarModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(config, editFormElement);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(config, addFormElement);

addFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(config, avatarFormEl);
avatarFormValidator.enableValidation();

const cardPopup = new PopupWithForm({
  popupSelector: "#card-edit-modal",
  handleFormSubmit: handleCardFormSubmit,
});

cardPopup.setEventListeners();

const editAvatar = new PopupWithForm({
  popupSelector: "#avatar-modal",
  handleFormSubmit: handleAvatarFormSubmit,
});
editAvatar.setEventListeners();

const editPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileSubmit,
});

editPopup.setEventListeners();
const popupImage = new PopupWithImage("#preview-image-modal");
popupImage.setEventListeners();

const deleteCardModal = new PopupWithConfirmation("#delete-card");

deleteCardModal.setEventListeners();

const userInfo = new UserInfo({
  name: ".profile__title",
  job: ".profile__description",
  avatar: ".profile__image",
});
function handleEditProfile() {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;

  editPopup.open();

  editFormValidator.toggleButtonState();
}

profileEditButton.addEventListener("click", handleEditProfile);

function handleAvatarFormSubmit(data) {
  editAvatar.renderLoading(true);

  api
    .updateAvatar(data.avatar)
    .then((res) => {
      userInfo.setAvatarInfo({ avatar: res.avatar });

      editAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatar.renderLoading(false, "Save");
    });
}
avatarButton.addEventListener("click", () => editAvatar.open());

avatarFormValidator.toggleButtonState();

function handleProfileSubmit(inputValues) {
  editPopup.renderLoading(true);

  api
    .updateProfileInfo({ name: inputValues.title, about: inputValues.job })
    .then((data) => {
      userInfo.setUserInfo({ title: data.name, job: data.about });
      editPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editPopup.renderLoading(false, "Save");
    });
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    userId,
    "#card-template",
    (cardName, cardLink) => {
      popupImage.open(cardName, cardLink);
    },

    (cardId) => {
      deleteCardModal.open();
      deleteCardModal.setSubmitAction(() => {
        deleteCardModal.renderLoading(true);
        api
          .deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            deleteCardModal.close();
          })
          .catch((err) => console.error(err))
          .finally(() => {
            deleteCardModal.renderLoading(false, "Yes");
          });
      });
    },

    (cardId) => {
      if (card.isLiked()) {
        api
          .removeLike(cardId)
          .then((data) => {
            card.setLikes(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(cardId)
          .then((data) => {
            card.setLikes(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
  return card.getCardElement();
}

let cardSection;
let userId;
api
  .getApiInfo()
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo({ title: userData.name, job: userData.about });
    userInfo.setAvatarInfo({ avatar: userData.avatar });
    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          cardSection.addItem(createCard(cardData));
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((error) => {
    console.log(error);
  });

function handleCardFormSubmit(inputValues) {
  cardPopup.renderLoading(true);

  api
    .addCard({ name: inputValues.name, link: inputValues.link })
    .then((data) => {
      cardSection.addItem(createCard(data));

      cardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardPopup.renderLoading(false, "Create");
    });
}

addCardButton.addEventListener("click", () => {
  cardPopup.open();
  addFormValidator.toggleButtonState();
});
