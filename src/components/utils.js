import {closePopupByOverlayAndEscape} from '../components/modal.js';
import {hasInvalidInput} from '../components/validate.js'

export const openedPopup = (popup) => {
  popup.classList.add('popup_opened');
  closePopupByOverlayAndEscape(popup);
};

export const closedPopup = (popup) => {
  popup.classList.remove('popup_opened');
};

export const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};
