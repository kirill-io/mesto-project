import {toggleButtonState} from '../components/utils.js';

const selectionErrorMessage = (formInput) => {
  if (formInput.value.length === 0) {
    return 'Вы пропустили это поле.';
  } else if (formInput.value.length >= 1 && formInput.value.length < formInput.getAttribute('minlength')) {
    return `Минимальное количество символов: ${formInput.getAttribute('minlength')}. Длина текста сейчас: ${formInput.value.length} символ.`;
  } else if (formInput.validity.patternMismatch) {
    return formInput.dataset.errorMessage;
  } else if (formInput.type === 'url') {
    return formInput.validationMessage;
  }
};

export const searchErrorMessage = (formInput) => {
  return document.querySelector(`.${formInput.id}-error`);
};

const showInputError = (element, elementError, elementMessage, inputErrorClass, errorClass) => {
  element.classList.add(inputErrorClass);
  elementError.textContent = elementMessage;
  elementError.classList.add(errorClass);
};

const hideInputError = (element, elementError, inputErrorClass, errorClass) => {
  element.classList.remove(inputErrorClass);
  elementError.textContent = '';
  elementError.classList.remove(errorClass);
};

const isValid = (formInput, inputError, inputMessage, inputErrorClass, errorClass) => {
  if (!formInput.validity.valid) {
    showInputError(formInput, inputError, inputMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formInput, inputError, inputErrorClass, errorClass);
  }
};

export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const setEventListener = (form, buttonSave, inputSelector, inputErrorClass, errorClass, inactiveButtonClass) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      const inputError = searchErrorMessage(evt.target);
      const inputMessage = selectionErrorMessage(evt.target);
      isValid(evt.target, inputError, inputMessage, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonSave, inactiveButtonClass);
    });
  });
};

export const enableValidation = (objSettings) => {
  const formList = Array.from(document.querySelectorAll(objSettings.formSelector));
  formList.forEach((formElement) => {
    setEventListener(formElement, formElement.elements.popupSave, objSettings.inputSelector, objSettings.inputErrorClass, objSettings.errorClass, objSettings.inactiveButtonClass);
  });
};
