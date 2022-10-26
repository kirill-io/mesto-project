import '../pages/index.css';
import * as constants from '../utils/constants.js';
import { fillFieldValues, renderCard } from '../utils/utils.js';
import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const api = new Api(constants.config);
const userInfo = new UserInfo(constants.userSelectorsConfig);
const fordAddValidator = new FormValidator(constants.validationConfig, constants.formAdd);
const fordEditValidator = new FormValidator(constants.validationConfig, constants.formEdit);
const fordAvatarValidator = new FormValidator(constants.validationConfig, constants.formAvatar);
const popupImage = new PopupWithImage('popupImage');

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

const popupCreate = new PopupWithForm('popupAdd', {
  hendlerSubmit: (element) => {
    popupCreate.sumbitTextIsSaving();
    api.addNewCard(element.inputPlace, element.inputLink)
      .then((cards) => {
        const cardList = new Section({
          items: cards,
          renderer: (item) => {
            renderCard(item, userInfo.getUserId(), api, cardList);
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

fordAddValidator.enableValidation();
fordEditValidator.enableValidation();
fordAvatarValidator.enableValidation();

constants.buttonAvatar.addEventListener('click', () => {
  fordAvatarValidator.resetValidation();
  popupAvatar.open();
});

constants.buttonEdit.addEventListener('click', () => {
  fordEditValidator.resetValidation();
  fillFieldValues('editForm', userInfo.getUserInfo());
  popupEdit.open();
});

constants.buttonCreate.addEventListener('click', () => {
  fordAddValidator.resetValidation();
  popupCreate.open();
});

document.querySelector('.elements__list').addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__image')) {
    popupImage.open(evt.target);
  }
});
