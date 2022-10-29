import '../pages/index.css';
import * as constants from '../utils/constants.js';
import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupDeleteImage from '../components/PopupDeleteImage.js';
import Card from '../components/Card.js';

const api = new Api(constants.config);
const userInfo = new UserInfo(constants.userSelectorsConfig);
const popupImage = new PopupWithImage('popupImage');

const cardList = new Section({
  renderer: (item) => {
    renderCard(item, cardList);
  }
}, '.elements__list');

const formValidators = {};

const enableValidation = (formConfig) => {
  const formList = Array.from(document.querySelectorAll(formConfig.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formConfig, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

const popupAvatar = new PopupWithForm('popupAvatarEdit', {
  hendleSubmit: (element) => {
    popupAvatar.renderLoading(true);
    api.updateAvatar(element.inputLink)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      });
  }
});

const popupEdit = new PopupWithForm('popupEdit', {
  hendleSubmit: (element) => {
    popupEdit.renderLoading(true);
    api.changeUserData(element.inputName, element.inputAbout)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEdit.renderLoading(false);
      });
  }
});

const popupCreate = new PopupWithForm('popupAdd', {
  hendleSubmit: (element) => {
    popupCreate.renderLoading(true);
    api.addNewCard(element.inputPlace, element.inputLink)
      .then((cards) => {
        cardList.renderItems(cards);
        popupCreate.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupCreate.renderLoading(false);
      });
  }
});

const popupDelete = new PopupDeleteImage('popupDeleteImage', {
  hendleSubmit: (item, cardId) => {
    popupDelete.renderLoading(true);
    api.deleteCard(cardId)
      .then(() => {
        item.remove();
        popupDelete.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupDelete.renderLoading(false);
      });
  }
});

const createCard = (item) => {
  const cardElement = new Card({
    data: item,
    idUser: userInfo.getUserId(),
    putLike: (item) => {
      api.addLikeCard(item)
        .then((res) => {
          cardElement.like(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteLike: (item) => {
      api.deleteLikeCard(item)
        .then((res) => {
          cardElement.like(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteCard: (item, cardId) => {
      popupDelete.open(item, cardId);
    },
    handleCardClick: (image) => {
      popupImage.open(image);
    }
  }, 'element');

  const card = cardElement.renderer();

  return card;
};

const renderCard = (item, cardList) => {
  const card = createCard(item);
  cardList.addItem(card);
};

Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(constants.validationConfig);

constants.buttonAvatar.addEventListener('click', () => {
  formValidators['avatarEditForm'].resetValidation();
  popupAvatar.open();
});

constants.buttonEdit.addEventListener('click', () => {
  popupEdit.setInputValues(userInfo.getUserInfo());
  formValidators['editForm'].resetValidation();
  popupEdit.open();
});

constants.buttonCreate.addEventListener('click', () => {
  formValidators['addForm'].resetValidation();
  popupCreate.open();
});
