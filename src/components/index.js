import '../pages/index.css';
import {initialElements} from './elementsData.js';
import * as constants from './constants.js';
import {enableValidation, resetForm, clearFields} from './validate.js'
import {createElement} from './card.js';
import {openPopup, closePopup, fillInFormInputs, editProfileFormSubmitHandler, addPopupCloseHandlerOnClickOnOverlay} from './modal.js';
import {} from './utils.js';

const buttonEditProfile = document.querySelector('.profile__edit');
const buttonAddPlace = document.querySelector('.profile__add');
const popupEdit = document.querySelector('#popupEdit');
const buttonPopupEditClose = popupEdit.querySelector('.popup__close');
const buttonPopupEditSave = popupEdit.querySelector('.popup__save');
const popupAdd = document.querySelector('#popupAdd');
const buttonPopupAddClose = popupAdd.querySelector('.popup__close');
const popupImage = document.querySelector('#popupImage');
const buttonPopupImageClose = popupImage.querySelector('.popup__close');
const popups = document.querySelectorAll('.popup');

const renderInitialElements = (arrayData) => {
  for (let i = 0; i < arrayData.length; i++) {
    constants.elementsList.append(createElement(arrayData[i]));
  }
};

const addNewElement = (placeName, placeLink) => {
  const place = {};
  place.name = checkPlaceName(placeName);
  place.link = placeLink;
  return place;
};

const renderNewElement = (objNewElement) => {
  elementsList.prepend(createElement(objNewElement));
};

const addElementFormSubmitHandler = (e) => {
  e.preventDefault();
  renderNewElement(addNewElement(inputPlace.value, inputLink.value));
  closePopup(popupAdd);
};

renderInitialElements(initialElements);

buttonEditProfile.addEventListener('click', () => {
  fillInFormInputs(constants.profileName, constants.profileDesc, constants.inputName, constants.inputDesc);
  resetForm (constants.formEditProfile, buttonPopupEditSave, constants.validationConfig.inactiveButtonClass, constants.validationConfig.inputSelector, constants.validationConfig.inputErrorClass, constants.validationConfig.errorClass);
  openPopup(popupEdit);
});

buttonPopupEditClose.addEventListener('click', () => {
  closePopup(popupEdit);
});

constants.formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);

buttonAddPlace.addEventListener('click', () => {
  clearFields(constants.formAddProfile, constants.validationConfig.inputSelector);
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

popups.forEach((popup) => addPopupCloseHandlerOnClickOnOverlay(popup));

enableValidation(constants.validationConfig);
