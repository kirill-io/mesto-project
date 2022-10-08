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
const popups = document.querySelectorAll('.popup');
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
    .then((result) => {
      renderNewElement(addNewElement(constants.inputPlace.value, constants.inputLink.value));
      setAttribute(constants.elementsList.firstElementChild, 'data-id', `${result._id}`);
      setAttribute(constants.elementsList.firstElementChild.querySelector('.element__like'), 'data-id', `${result._id}`);
      closePopup(constants.popupAdd);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeSaveButton(constants.buttonPopupAddSave, false);
    });
  changeSaveButton(constants.buttonPopupAddSave, true);
};

Promise.all([getUserInformation(), getInitialCards()])
  .then(([userData, cards]) => {
    saveData(userData, constants.userData);
    fillInUserData(constants.userData, constants.profileName, constants.profileDesc, constants.profileAvatarImage);
    cards.forEach((element) => {
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

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

constants.formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);

buttonAddPlace.addEventListener('click', () => {
  clearFields(constants.formAddProfile);
  resetForm (constants.formAddProfile, constants.buttonPopupAddSave, constants.validationConfig.inactiveButtonClass, constants.validationConfig.inputSelector, constants.validationConfig.inputErrorClass, constants.validationConfig.errorClass);
  openPopup(popupAdd);
});

constants.formAddProfile.addEventListener('submit', addElementFormSubmitHandler);

popups.forEach((popup) => addPopupCloseHandlerOnClickOnOverlay(popup));

buttonPopupDeleteImage.addEventListener('submit', deleteElementFormSubmitHandler);

profileAvatar.addEventListener('click', profileAvatarEditHandler);

constants.formAvatarEdit.addEventListener('submit', updateAvatarFormSubmitHandler);

enableValidation(constants.validationConfig);
