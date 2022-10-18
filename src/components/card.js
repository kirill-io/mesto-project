import * as constants from './constants.js';
import {popupPictureText, elementTemplate, popupPicture} from './constants.js';
import {openPopup, closePopup} from '../components/modal.js';
import {setAttribute} from './utils.js';
import {addLikeCard, deleteLikeCard, deleteCard} from './Api.js'

export const createElement = (cardData, userData) => {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  if (cardData._id) {
    setAttribute(element, 'data-id', `${cardData._id}`);
  }
  element.querySelector('.element__name').textContent = cardData.name;
  elementImage.src = cardData.link;
  elementImage.alt = `${cardData.name}.`;
  elementImage.addEventListener('click', () => {
    setAttribute(constants.rootElement, 'data-type-popup', 'popupImage')
    openPopup(popupImage);
    popupPicture.src = cardData.link;
    popupPicture.alt = `${cardData.name}.`;
    popupPictureText.textContent = cardData.name;
  });
  if (cardData.hasOwnProperty('owner') && cardData.owner.hasOwnProperty('_id')) {
    if (cardData.owner._id !== userData._id) {
      element.querySelector('.element__remove').classList.add('element__remove_inactive');
    } else if (cardData.owner._id ===  userData._id) {
      element.querySelector('.element__remove').addEventListener('click', removeElementHandler);
    }
  } else {
    element.querySelector('.element__remove').addEventListener('click', removeElementHandler);
  }
  if (cardData._id) {
    setAttribute(element.querySelector('.element__like'), 'data-id', `${cardData._id}`)
  }
  element.querySelector('.element__like').addEventListener('click', putLikeHandler);
  if (cardData.hasOwnProperty('likes')) {
    element.querySelector('.element__like-amount').textContent = cardData.likes.length;
  } else {
    element.querySelector('.element__like-amount').textContent = 0;
  }
  return element;
};

const removeElementHandler = (e) => {
  setAttribute(constants.popupDeleteImage, 'data-id', `${e.target.offsetParent.dataset.id}`)
  openPopup(constants.popupDeleteImage)
};

const removeElement = (elementList, imageRemoveId) => {
  elementList.querySelectorAll('.element').forEach((element) => {
    if (element.dataset.id === imageRemoveId) {
      element.remove();
    }
  });
};

const putLikeHandler = (e) => {
  if (!e.target.classList.contains('element__like_active')) {
    addLikeCard(e.target.dataset.id)
      .then((result) => {
        checkTheNumberOfLikes(result);
        putLike(e.target);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteLikeCard(e.target.dataset.id)
      .then((result) => {
        checkTheNumberOfLikes(result);
        putLike(e.target);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const putLike = (element) => {
  element.classList.toggle('element__like_active');
};

const checkTheNumberOfLikes = (updateCard) => {
  constants.elementsList.querySelectorAll('.element').forEach((element) => {
    if (element.dataset.id === updateCard._id) {
      element.querySelector('.element__like-amount').textContent = updateCard.likes.length;
    }
  });
};

export const setLikeOnRender = (elementFromTheServer) => {
  elementFromTheServer.likes.forEach((like) => {
    if (like._id === constants.userData._id) {
      constants.elementsList.querySelectorAll('.element').forEach((item) => {
        if (item.dataset.id === elementFromTheServer._id) {
          item.querySelector('.element__like').classList.add('element__like_active');
        }
      });
    }
  });
};

export const deleteElementFormSubmitHandler = (e) => {
  e.preventDefault();
  deleteCard(e.path[2].dataset.id)
    .then(() => {
      removeElement(constants.elementsList, e.path[2].dataset.id);
      closePopup(constants.popupDeleteImage);
    })
    .catch((err) => {
      console.log(err);
    });
};
