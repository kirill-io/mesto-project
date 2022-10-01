const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const buttonEditProfile = document.querySelector('.profile__edit');
const buttonAddPlace = document.querySelector('.profile__add');
const popupEdit = document.querySelector('#popupEdit');
const buttonPopupEditClose = popupEdit.querySelector('.popup__close');
const formEdit = document.forms.editForm;
const inputName = formEdit.elements.inputName;
const inputDesc = formEdit.elements.inputDescription;
const buttonPopupEditSave = popupEdit.querySelector('.popup__save');
const popupAdd = document.querySelector('#popupAdd');
const buttonPopupAddClose = popupAdd.querySelector('.popup__close');
const formAdd = document.forms.addForm;
const inputPlace = formAdd.elements.inputPlace;
const inputLink = formAdd.elements.inputLink;
const buttonPopupAddSave = formAdd.elements.popupSave;
const popupImage = document.querySelector('#popupImage');
const buttonPopupImageClose = popupImage.querySelector('.popup__close');
const popupPicture = popupImage.querySelector('.popup__image');
const popupPictureText = popupImage.querySelector('.popup__image-text');
const elementTemplate = document.querySelector('#elementTemplate').content;
const elementsList = document.querySelector('.elements__list');
const elementName = document.querySelector('.element__name');
const elementImage = document.querySelector('.element__image');

function createElement(objData) {
  let element;
  let elementImage;
  element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__name').textContent = objData.name;
  elementImage = element.querySelector('.element__image');
  elementImage.src = objData.link;
  elementImage.alt = `${objData.name}.`;
  elementImage.addEventListener('click', () => {
    openedPopup(popupImage);
    popupPicture.src = objData.link;
    popupPicture.alt = `${objData.name}.`;
    popupPictureText.textContent = objData.name;
  });
  element.querySelector('.element__remove').addEventListener('click', removeElement);
  element.querySelector('.element__like').addEventListener('click', putLike);
  return element;
};

function renderInitialElements (arrayData) {
  for (let i = 0; i < arrayData.length; i++) {
    elementsList.append(createElement(arrayData[i]));
  }
};

function removeElement(e) {
  e.path[1].remove();
};

function putLike(e) {
  e.target.classList.toggle('element__like_active');
};

function openedPopup(popup) {
  popup.classList.add('popup_opened');
};

function closedPopup(popup) {
  popup.classList.remove('popup_opened');
};

function filingFields(name, description, nameField, descriptionField) {
  nameField.value = name.textContent;
  descriptionField.value = description.textContent;
};

function editProfileFormSubmitHandler (e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDesc.textContent = inputDesc.value;
  closedPopup(popupEdit);
};

function addElementFormSubmitHandler(e) {
  e.preventDefault();
  renderNewElement(addNewElement(inputPlace.value, inputLink.value));
  closedPopup(popupAdd);
  inputPlace.value = '';
  inputLink.value = '';
};

function checkNamePalce (namePlace) {
  return namePlace[0].toUpperCase() + namePlace.slice(1).toLowerCase();
};

function addNewElement (place, link) {
  const objPlace = {};
  objPlace.name = checkNamePalce(place);
  objPlace.link = link;
  return objPlace;
};

function renderNewElement (objNewElement) {
  elementsList.prepend(createElement(objNewElement));
};

const resetInputs = (inputElement, elementError, formButton) => {
  inputElement.classList.remove('popup__input_type_error');
  elementError.textContent = '';
  elementError.classList.remove('popup__input-error_active');
  formButton.disabled = false;
  formButton.classList.remove('popup__save_inactive');
};

const resetForm = (form, formButton) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    const elementError = searchErrorMessage(inputElement);
    resetInputs(inputElement, elementError, formButton);
  });
  toggleButtonState(inputList, formButton);
};

const clearFields = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.value = '';
  });
};

renderInitialElements(initialElements);

buttonEditProfile.addEventListener('click', () => {
  filingFields(profileName, profileDesc, inputName, inputDesc);
  resetForm (formEdit, buttonPopupEditSave);
  openedPopup(popupEdit);
});

buttonPopupEditClose.addEventListener('click', () => {
  closedPopup(popupEdit);
});

formEdit.addEventListener('submit', editProfileFormSubmitHandler);

buttonAddPlace.addEventListener('click', () => {
  clearFields(formAdd);
  resetForm (formAdd, buttonPopupAddSave);
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

const searchErrorMessage = (formInput) => {
  return document.querySelector(`.${formInput.id}-error`);
};

const showInputError = (element, elementError, elementMessage) => {
  element.classList.add('popup__input_type_error');
  elementError.textContent = elementMessage;
  elementError.classList.add('popup__input-error_active');
};

const hideInputError = (element, elementError) => {
  element.classList.remove('popup__input_type_error');
  elementError.textContent = '';
  elementError.classList.remove('popup__input-error_active');
};

const isValid = (formInput, inputError, inputMessage) => {
  if (!formInput.validity.valid) {
    showInputError(formInput, inputError, inputMessage);
  } else {
    hideInputError(formInput, inputError);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__save_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__save_inactive');
  }
};

const setEventListener = (form, buttonSave) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      const inputError = searchErrorMessage(evt.target);
      const inputMessage = selectionErrorMessage(evt.target);
      isValid(evt.target, inputError, inputMessage);
      toggleButtonState(inputList, buttonSave);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListener(formElement, formElement.elements.popupSave);
  });
};

enableValidation();
