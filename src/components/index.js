import '../pages/index.css';
import * as constants from './constants.js';
import { fillFieldValues, renderCard } from './utils.js';
import Api from './Api.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const api = new Api(constants.config);
const userInfo = new UserInfo(constants.userSelectorsConfig);


Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userInfo.setUserId(userData);

    const cardList = new Section({
      items: cards.reverse(),
      renderer: (item) => {
        renderCard(item, userInfo.getUserId(), api, cardList);
      }
    }, '.elements__list');
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const fordAddValidator = new FormValidator(constants.validationConfig, constants.formAdd);
fordAddValidator.enableValidation();

const fordEditValidator = new FormValidator(constants.validationConfig, constants.formEdit);
fordEditValidator.enableValidation();

const fordAvatarValidator = new FormValidator(constants.validationConfig, constants.formAvatar);
fordAvatarValidator.enableValidation();

const popupAvatar = new PopupWithForm('popupAvatarEdit', {
  hendlerSubmit: (element) => {
    popupAvatar.sumbitTextIsSaving();
    api.updateAvatar(element.inputLink)
      .then((res) => {
        userInfo.setUserAvatar(res);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.sumbitTextIsSave();
      });
  }
});

constants.buttonAvatar.addEventListener('click', () => {
  fordAvatarValidator.resetValidation();
  popupAvatar.open();
})

const popupEdit = new PopupWithForm('popupEdit', {
  hendlerSubmit: (element) => {
    popupEdit.sumbitTextIsSaving();
    api.changeUserData(element.inputName, element.inputAbout)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEdit.sumbitTextIsSave();
      });
  }
});

constants.buttonEdit.addEventListener('click', () => {
  fordEditValidator.resetValidation();
  fillFieldValues('editForm', userInfo.getUserInfo());
  popupEdit.open();
});

const popupCreate = new PopupWithForm('popupAdd', {
  hendlerSubmit: (element) => {
    popupCreate.sumbitTextIsSaving();
    api.addNewCard(element.inputPlace, element.inputLink)
      .then((cards) => {
        const cardList = new Section({
          items: cards,
          renderer: (item) => {
            renderCard(item, userInfo.getUserId(), cardList);
          }
        }, '.elements__list');
        cardList.renderItems();
        popupCreate.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupCreate.sumbitTextIsSave();
      });
  }
});

constants.buttonCreate.addEventListener('click', () => {
  fordAddValidator.resetValidation();
  popupCreate.open();
});

const popupImage = new PopupWithImage('popupImage');
document.querySelector('.elements__list').addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__image')) {
    popupImage.open(evt.target);
  }
});


