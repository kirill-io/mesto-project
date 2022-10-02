import {profileName, profileDesc, inputName, inputDesc, inputPlace, inputLink} from './index.js';
import {closedPopup, toggleButtonState} from '../components/utils.js';
import {searchErrorMessage} from '../components/validate.js';
import {renderNewElement, addNewElement} from '../components/card.js';

export const closePopupByOverlayAndEscape = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closedPopup(window[evt.target.id]);
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closedPopup(popup);
    }
  });
};

export const filingFields = (name, description, nameField, descriptionField) => {
  nameField.value = name.textContent;
  descriptionField.value = description.textContent;
};

export const editProfileFormSubmitHandler = (e) => {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDesc.textContent = inputDesc.value;
  closedPopup(popupEdit);
};

export const addElementFormSubmitHandler = (e) => {
  e.preventDefault();
  renderNewElement(addNewElement(inputPlace.value, inputLink.value));
  closedPopup(popupAdd);
  inputPlace.value = '';
  inputLink.value = '';
};

const resetInputs = (inputElement, elementError, formButton) => {
  inputElement.classList.remove('popup__input_type_error');
  elementError.textContent = '';
  elementError.classList.remove('popup__input-error_active');
  formButton.disabled = false;
  formButton.classList.remove('popup__save_inactive');
};

export const resetForm = (form, formButton, inactiveButtonClass) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    const elementError = searchErrorMessage(inputElement);
    resetInputs(inputElement, elementError, formButton);
  });
  toggleButtonState(inputList, formButton, inactiveButtonClass);
};

export const clearFields = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.value = '';
  });
};
