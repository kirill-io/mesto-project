const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const buttonEditProfile = document.querySelector('.profile__edit');
const buttonAddPlace = document.querySelector('.profile__add');
const popupEdit = document.querySelector('#popupEdit');
const buttonPopupEditClose = popupEdit.querySelector('.popup__close');
const formEdit = document.forms.editForm;
const inputName = formEdit.elements.inputName;
const inputDesc = formEdit.elements.inputDescription;
const buttonPopupEditSave = formEdit.elements.popupEditSave;
const popupAdd = document.querySelector('#popupAdd');
const buttonPopupAddClose = popupAdd.querySelector('.popup__close');
const formAdd = popupAdd.querySelector('.popup__form');
const inputPlace = popupAdd.querySelector('.popup__input_type_place');
const inputLink = popupAdd.querySelector('.popup__input_type_link');
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

renderInitialElements(initialElements);

buttonEditProfile.addEventListener('click', () => {
  openedPopup(popupEdit);
  filingFields(profileName, profileDesc, inputName, inputDesc);
});

buttonPopupEditClose.addEventListener('click', () => {
  closedPopup(popupEdit);
});

formEdit.addEventListener('submit', editProfileFormSubmitHandler);

buttonAddPlace.addEventListener('click', () => {
  openedPopup(popupAdd);
});

buttonPopupAddClose.addEventListener('click', () => {
  closedPopup(popupAdd);
});

formAdd.addEventListener('submit', addElementFormSubmitHandler);

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
    buttonElement.classList.add('popup__save_inactive');
  } else {
    buttonElement.classList.remove('popup__save_inactive');
  }
};

const setEventListener = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  if (!profileName.textContent.length || !profileDesc.textContent.length) {
    toggleButtonState(inputList, buttonPopupEditSave);
  }
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      const inputError = searchErrorMessage(evt.target);
      const inputMessage = selectionErrorMessage(evt.target);
      isValid(evt.target, inputError, inputMessage);
      toggleButtonState(inputList, buttonPopupEditSave);
    });
  });
};

setEventListener(formEdit);
