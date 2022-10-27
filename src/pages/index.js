import '../pages/index.css';
import * as constants from '../utils/constants.js';
import { renderCard } from '../utils/utils.js';
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
  hendleSubmit: (element) => {
    popupAvatar.renderLoading(true);
    api.updateAvatar(element.inputLink)
      .then((res) => {
        userInfo.setUserAvatar(res);
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
        const cardList = new Section({
          items: cards,
          renderer: (item) => {
            renderCard(item, userInfo.getUserId(), api, cardList, popupImage);
          }
        }, '.elements__list');
        cardList.renderItems();
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

Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userInfo.setUserId(userData);

    const cardList = new Section({
      items: cards.reverse(),
      renderer: (item) => {
        renderCard(item, userInfo.getUserId(), api, cardList, popupImage);
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
  popupEdit.setInputValues(userInfo.getUserInfo());
  popupEdit.open();
});

constants.buttonCreate.addEventListener('click', () => {
  fordAddValidator.resetValidation();
  popupCreate.open();
});
