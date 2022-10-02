import {popupPictureText, elementTemplate, elementsList, popupPicture} from '../pages/index.js';
import {openedPopup} from '../components/utils.js';

export const renderInitialElements = (arrayData) => {
  for (let i = 0; i < arrayData.length; i++) {
    elementsList.append(createElement(arrayData[i]));
  }
};

const createElement = (objData) => {
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

const removeElement = (e) => {
  e.path[1].remove();
};

const putLike = (e) => {
  e.target.classList.toggle('element__like_active');
};

const checkNamePalce = (namePlace) => {
  return namePlace[0].toUpperCase() + namePlace.slice(1).toLowerCase();
};

export const addNewElement = (place, link) => {
  const objPlace = {};
  objPlace.name = checkNamePalce(place);
  objPlace.link = link;
  return objPlace;
};

export const renderNewElement = (objNewElement) => {
  elementsList.prepend(createElement(objNewElement));
};
