import {profileName, profileDesc, inputName, inputDesc, inputPlace, inputLink, elementsList} from './constants.js';
import {checkPlaceName} from '../components/utils.js';
import {createElement} from '../components/card.js';

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscPress);
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscPress);
};

const closeByEscPress = (e) => {
  if (e.key === 'Escape') {
    closePopup(document.getElementById(`${e.target.dataset.typePopup}`));
  }
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

export const addPopupCloseHandlerOnClickOnOverlay = (popup) => {
  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
      closePopup(window[e.target.id]);
    }
  });
};
