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

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
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

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListener(formElement, formElement.elements.popupSave, validationConfig.inputSelector, validationConfig.inputErrorClass, validationConfig.errorClass, validationConfig.inactiveButtonClass);
  });
};





const disableSubmitButton = (button) => {
  button.disabled = false;
};

const resetInputs = (inputElement, elementError, formButton, inputErrorClass, errorClass, inactiveButtonClass) => {
  inputElement.classList.remove(inputErrorClass);
  elementError.textContent = '';
  elementError.classList.remove(errorClass);
  disableSubmitButton(formButton);
  formButton.classList.remove(inactiveButtonClass);
};

export const resetForm = (form, formButton, inactiveButtonClass, inputSelector, inputErrorClass, errorClass) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    const elementError = searchErrorMessage(inputElement);
    resetInputs(inputElement, elementError, formButton, inputErrorClass, errorClass, inactiveButtonClass);
  });
  toggleButtonState(inputList, formButton, inactiveButtonClass);
};

export const clearFields = (form) => {
  form.reset();
};
