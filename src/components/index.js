import '../pages/index.css';
import * as constants from './constants.js';
import {enableValidation, resetForm, clearFields} from './validate.js'
import {createElement, deleteElementFormSubmitHandler, setLikeOnRender} from './card.js';
import {openPopup, closePopup, fillInFormInputs, editProfileFormSubmitHandler, addPopupCloseHandlerOnClickOnOverlay, changeSaveButton, profileAvatarEditHandler, updateAvatarFormSubmitHandler} from './modal.js';
import {checkPlaceName, saveData, fillInUserData, setAttribute} from './utils.js';
import {getUserInformation, getInitialCards, addNewCard} from './api.js';

const buttonEditProfile = document.querySelector('.profile__edit');
const buttonAddPlace = document.querySelector('.profile__add');
const popupAdd = document.querySelector('#popupAdd');
const buttonPopupAddClose = popupAdd.querySelector('.popup__close');
const popupImage = document.querySelector('#popupImage');
const buttonPopupImageClose = popupImage.querySelector('.popup__close');
const popups = document.querySelectorAll('.popup');
const buttonPopupDeleteImageClose = constants.popupDeleteImage.querySelector('.popup__close')
const buttonPopupDeleteImage = document.forms.deleteForm;
const profileAvatar = document.querySelector('.profile__avatar');

const addNewElement = (placeName, placeLink) => {
  const place = {};
  place.name = checkPlaceName(placeName);
  place.link = placeLink;
  return place;
};

const renderNewElement = (objNewElement) => {
  constants.elementsList.prepend(createElement(objNewElement, constants.userData));
};

const addElementFormSubmitHandler = (e) => {
  e.preventDefault();
  addNewCard(checkPlaceName(constants.inputPlace.value), constants.inputLink.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      setAttribute(constants.elementsList.firstElementChild, 'data-id', `${result._id}`);
      setAttribute(constants.elementsList.firstElementChild.querySelector('.element__like'), 'data-id', `${result._id}`);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeSaveButton(constants.buttonPopupAddSave, false);
      closePopup(constants.popupAdd);
    });
  renderNewElement(addNewElement(constants.inputPlace.value, constants.inputLink.value));
  changeSaveButton(constants.buttonPopupAddSave, true);
};

getUserInformation()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    saveData(result, constants.userData);
    fillInUserData(constants.userData, constants.profileName, constants.profileDesc, constants.profileAvatarImage);
  })
  .catch((err) => {
    console.log(err);
  });

getInitialCards()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    console.log(result);
    result.forEach((element) => {
      constants.elementsList.append(createElement(element, constants.userData));
      setLikeOnRender(element);
    });
  })
  .catch((err) => {
    console.log(err);
  });

buttonEditProfile.addEventListener('click', () => {
  fillInFormInputs(constants.profileName, constants.profileDesc, constants.inputName, constants.inputDesc);
  resetForm (constants.formEditProfile, constants.buttonPopupEditSave, constants.validationConfig.inactiveButtonClass, constants.validationConfig.inputSelector, constants.validationConfig.inputErrorClass, constants.validationConfig.errorClass);
  openPopup(constants.popupEdit);
});

constants.buttonPopupEditClose.addEventListener('click', () => {
  closePopup(constants.popupEdit);
});

constants.formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);

buttonAddPlace.addEventListener('click', () => {
  clearFields(constants.formAddProfile);
  resetForm (constants.formAddProfile, constants.buttonPopupAddSave, constants.validationConfig.inactiveButtonClass, constants.validationConfig.inputSelector, constants.validationConfig.inputErrorClass, constants.validationConfig.errorClass);
  openPopup(popupAdd);
});

buttonPopupAddClose.addEventListener('click', () => {
  closePopup(popupAdd);
});

constants.formAddProfile.addEventListener('submit', addElementFormSubmitHandler);

buttonPopupImageClose.addEventListener('click', () => {
  closePopup(popupImage);
  constants.popupPicture.src = '';
});

buttonPopupDeleteImageClose.addEventListener('click', () => {
  closePopup(constants.popupDeleteImage);
});

popups.forEach((popup) => addPopupCloseHandlerOnClickOnOverlay(popup));

buttonPopupDeleteImage.addEventListener('submit', deleteElementFormSubmitHandler);

profileAvatar.addEventListener('click', profileAvatarEditHandler);

constants.buttonPopupAvatarEditClose.addEventListener('click', () => {
  closePopup(constants.popupAvatarEdit);
});

constants.formAvatarEdit.addEventListener('submit', updateAvatarFormSubmitHandler);

enableValidation(constants.validationConfig);
