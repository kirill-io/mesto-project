const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const buttonEditProfile = document.querySelector('.profile__edit');
const buttonAddPlace = document.querySelector('.profile__add');
const popupEdit = document.querySelector('#popupEdit');
const buttonPopupEditClose = popupEdit.querySelector('.popup__close');
const formEdit = popupEdit.querySelector('.popup__form');
const inputName = popupEdit.querySelector('.popup__input_type_name');
const inputDesc = popupEdit.querySelector('.popup__input_type_description');
const popupAdd = document.querySelector('#popupAdd');
const buttonPopupAddClose = popupAdd.querySelector('.popup__close');
const formAdd = popupAdd.querySelector('.popup__form');
const inputPlace = popupAdd.querySelector('.popup__input_type_place');
const inputLink = popupAdd.querySelector('.popup__input_type_link');
const popupImage = document.querySelector('#popupImage');
const buttonPopupImageClose = popupImage.querySelector('.popup__close');
const popupPicture = popupImage.querySelector('.popup__image');
const elementTemplate = document.querySelector('#elementTemplate').content;
const elementsList = document.querySelector('.elements__list');
const elementName = document.querySelector('.element__name');
const elementImage = document.querySelector('.element__image');

function createElement(objData, elementCloneClass, elementCloneNameClass, elementCloneImageClass, elementCloneLikeClass, elementCloneRemoveClass, template) {
  let element;
  element = template.querySelector(elementCloneClass).cloneNode(true);
  element.querySelector(elementCloneNameClass).textContent = objData.name;
  element.querySelector(elementCloneImageClass).src = objData.link;
  element.querySelector(elementCloneImageClass).addEventListener('click', () => {
    openedPopup(popupImage);
    popupPicture.src = objData.link;
  });
  element.querySelector(elementCloneRemoveClass).addEventListener('click', removeElement);
  element.querySelector(elementCloneLikeClass).addEventListener('click', putLike);
  return element;
};

function renderInitialElements (arrayData, elementCloneClass, elementCloneNameClass, elementCloneImageClass, elementCloneLikeClass, elementCloneRemoveClass, template, elementInsert) {
  for (let i = 0; i < arrayData.length; i++) {
    elementInsert.append(createElement(arrayData[i], elementCloneClass, elementCloneNameClass, elementCloneImageClass, elementCloneLikeClass, elementCloneRemoveClass, template));
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

function formEditSubmitHandler (e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDesc.textContent = inputDesc.value;
  closedPopup(popupEdit);
};

function formAddSubmitHandler(e) {
  e.preventDefault();
  renderNewElement(addNewElement(inputPlace.value, inputLink.value), '.element', '.element__name', '.element__image', '.element__like', '.element__remove', elementTemplate, elementsList);
  inputPlace.value = '';
  inputLink.value = '';
  closedPopup(popupAdd);
};

function checkNamePalce (namePlace) {
  return namePlace[0].toUpperCase() + namePlace.slice(1).toLowerCase();
};

function addNewElement (place, link) {
  let objPlace = {};
  objPlace.name = checkNamePalce(place);
  objPlace.link = link;
  return objPlace;
};

function renderNewElement (objNewElement, elementCloneClass, elementCloneNameClass, elementCloneImageClass, elementCloneLikeClass, elementCloneRemoveClass, template, elementInsert) {
  elementInsert.prepend(createElement(objNewElement, elementCloneClass, elementCloneNameClass, elementCloneImageClass, elementCloneLikeClass, elementCloneRemoveClass, template));
};

renderInitialElements(initialElements, '.element', '.element__name', '.element__image', '.element__like', '.element__remove', elementTemplate, elementsList);

buttonEditProfile.addEventListener('click', () => {
  openedPopup(popupEdit);
  filingFields(profileName, profileDesc, inputName, inputDesc);
});

buttonPopupEditClose.addEventListener('click', () => {
  closedPopup(popupEdit);
});

formEdit.addEventListener('submit', formEditSubmitHandler);

buttonAddPlace.addEventListener('click', () => {
  openedPopup(popupAdd);
});

buttonPopupAddClose.addEventListener('click', () => {
  closedPopup(popupAdd);
});

formAdd.addEventListener('submit', formAddSubmitHandler);

buttonPopupImageClose.addEventListener('click', () => {
  closedPopup(popupImage);
  popupPicture.src = '';
});
