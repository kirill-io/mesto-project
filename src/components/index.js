import '../pages/index.css';
import {initialElements} from './elementsData.js';
import {objSettings} from './objSettings.js';
import {enableValidation} from './validate.js'
import {renderInitialElements} from './card.js';
import {filingFields, resetForm, editProfileFormSubmitHandler, clearFields, addElementFormSubmitHandler} from './modal.js';
import {openedPopup, closedPopup} from './utils.js';

export const profileName = document.querySelector('.profile__name');
export const profileDesc = document.querySelector('.profile__description');
const buttonEditProfile = document.querySelector('.profile__edit');
const buttonAddPlace = document.querySelector('.profile__add');
const popupEdit = document.querySelector('#popupEdit');
const buttonPopupEditClose = popupEdit.querySelector('.popup__close');
const formEdit = document.forms.editForm;
export const inputName = formEdit.elements.inputName;
export const inputDesc = formEdit.elements.inputDescription;
const buttonPopupEditSave = popupEdit.querySelector('.popup__save');
const popupAdd = document.querySelector('#popupAdd');
const buttonPopupAddClose = popupAdd.querySelector('.popup__close');
const formAdd = document.forms.addForm;
export const inputPlace = formAdd.elements.inputPlace;
export const inputLink = formAdd.elements.inputLink;
const buttonPopupAddSave = formAdd.elements.popupSave;
const popupImage = document.querySelector('#popupImage');
const buttonPopupImageClose = popupImage.querySelector('.popup__close');
export const popupPicture = popupImage.querySelector('.popup__image');
export const popupPictureText = popupImage.querySelector('.popup__image-text');
export const elementTemplate = document.querySelector('#elementTemplate').content;
export const elementsList = document.querySelector('.elements__list');

renderInitialElements(initialElements);

buttonEditProfile.addEventListener('click', () => {
  filingFields(profileName, profileDesc, inputName, inputDesc);
  resetForm (formEdit, buttonPopupEditSave, objSettings.inactiveButtonClass);
  openedPopup(popupEdit);
});

buttonPopupEditClose.addEventListener('click', () => {
  closedPopup(popupEdit);
});

formEdit.addEventListener('submit', editProfileFormSubmitHandler);

buttonAddPlace.addEventListener('click', () => {
  clearFields(formAdd);
  resetForm (formAdd, buttonPopupAddSave, objSettings.inactiveButtonClass);
  openedPopup(popupAdd);
});

buttonPopupAddClose.addEventListener('click', () => {
  closedPopup(popupAdd);
});

buttonPopupAddSave.addEventListener('click', addElementFormSubmitHandler);

buttonPopupImageClose.addEventListener('click', () => {
  closedPopup(popupImage);
  popupPicture.src = '';
});

enableValidation(objSettings);
