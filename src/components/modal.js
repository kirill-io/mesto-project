import {profileName, profileDesc, inputName, inputDesc, inputPlace, inputLink, elementsList} from './constants.js';
import {checkPlaceName} from '../components/utils.js';
import {createElement} from '../components/card.js';

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscPress);
  closeByOverlayClick(popup);
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscPress);
};

const closeByEscPress = (e) => {
  console.log(e.target.className);
  if (e.key === 'Escape') {
    if (e.target.className === 'root') {
      closePopup(document.getElementById(`popupImage`));
    } else {
      closePopup(document.getElementById(`${e.target.dataset.typePopup}`));
    }
  }
};

const closeByOverlayClick = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(window[evt.target.id]);
    }
  });
};

export const fillInFormInputs = (name, description, nameField, descriptionField) => {
  nameField.value = name.textContent;
  descriptionField.value = description.textContent;
};

export const editProfileFormSubmitHandler = (e) => {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDesc.textContent = inputDesc.value;
  closePopup(popupEdit);
};

const addNewElement = (placeName, placeLink) => {
  // Если я перенесу данную функцию в index.js, то ее из index.js придется экспортировать.
  // Т.к. она используется в функции addElementFormSubmitHandler в modal.js. Судя из замечаний
  // из index.js нельзя экспортирвать, поэтому перенес ее в modal.js
  const place = {};
  place.name = checkPlaceName(placeName);
  place.link = placeLink;
  return place;
};

const renderNewElement = (objNewElement) => {
  // Если я перенесу данную функцию в index.js, то ее из index.js придется экспортировать.
  // Т.к. она используется в функции addElementFormSubmitHandler в modal.js. Судя из замечаний
  // из index.js нельзя экспортирвать, поэтому перенес ее в modal.js
  elementsList.prepend(createElement(objNewElement));
};

export const addElementFormSubmitHandler = (e) => {
  e.preventDefault();
  renderNewElement(addNewElement(inputPlace.value, inputLink.value));
  closePopup(popupAdd);
};
