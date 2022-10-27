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
const popupImage = new PopupWithImage('popupImage');

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

enableValidation(constants.validationConfig);

console.log(formValidators);

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
