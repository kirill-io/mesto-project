import {popupPictureText, elementTemplate, popupPicture} from './constants.js';
import {openPopup} from '../components/modal.js';

export const createElement = (cardData) => {
  let element;
  let elementImage;
  element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__name').textContent = cardData.name;
  elementImage = element.querySelector('.element__image');
  elementImage.src = cardData.link;
  elementImage.alt = `${cardData.name}.`;
  elementImage.addEventListener('click', () => {
    openPopup(popupImage);
    popupPicture.src = cardData.link;
    popupPicture.alt = `${cardData.name}.`;
    popupPictureText.textContent = cardData.name;
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
