export default class FormValidator {
  constructor({ formSelector,
    inputSelector,
    inputErrorClass,
    errorClass,
    inactiveButtonClass },
    formElement) {
      this._formSelector = formSelector;
      this._inputSelector = inputSelector;
      this._inputErrorClass = inputErrorClass;
      this._errorClass = errorClass;
      this._inactiveButtonClass = inactiveButtonClass;
      this._formElement = formElement;
      this._inputList = formElement.querySelectorAll(inputSelector);
      this._buttonSave = formElement.elements.popupSave;
      this._inputError;
      this._inputMessage;
  }

  enableValidation() {
    this._setEventListener();
  };

  resetValidation() {
    this._inputList.forEach((input) => {
      input.classList.remove(this._inputErrorClass);
      this._searchErrorMessage(input).textContent = '';
      this._searchErrorMessage(input).classList.remove(this._errorClass);
    });
    this._buttonSave.disabled = false;
    this._buttonSave.classList.remove(this._inactiveButtonClass);
  };

  _searchErrorMessage(formInput) {
    return document.querySelector(`.${formInput.id}-error`);
  }

  _selectionErrorMessage(formInput) {
    if (formInput.value.length === 0) {
      return 'Вы пропустили это поле.';
    } else if (formInput.value.length >= 1 && formInput.value.length < formInput.getAttribute('minlength')) {
      return `Минимальное количество символов: ${formInput.getAttribute('minlength')}. Длина текста сейчас: ${formInput.value.length} символ.`;
    } else if (formInput.validity.patternMismatch) {
      return formInput.dataset.errorMessage;
    } else if (formInput.type === 'url') {
      return formInput.validationMessage;
    }
  }

  _selectionError(formInput) {
    this._inputError = this._searchErrorMessage(formInput);
    this._inputMessage = this._selectionErrorMessage(formInput);
  }

  _showInputError(element) {
    element.classList.add(this._inputErrorClass);
    this._inputError.textContent = this._inputMessage;
    this._inputError.classList.add(this._errorClass);
  }

  _hideInputError(element) {
    element.classList.remove(this._inputErrorClass);
    this._inputError.textContent = '';
    this._inputError.classList.remove(this._errorClass);
  }

  _isValid (formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput);
    }
    else {
      this._hideInputError(formInput);
    }
  };

  _hasInvalidInput() {
    let invalidInput;
    this._inputList.forEach((inputElement) => {
      if (!inputElement.validity.valid) {
        invalidInput = true;
      }
    });
    return invalidInput;
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonSave.disabled = true;
      this._buttonSave.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonSave.disabled = false;
      this._buttonSave.classList.remove(this._inactiveButtonClass);
    }
  };

  _setEventListener() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        this._selectionError(evt.target);
        this._isValid(evt.target);
        this._toggleButtonState();
      });
    });
  };
}

