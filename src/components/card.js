export default class Card {
  constructor({ data, idUser, putLike, deleteLike, deleteCard, handleCardClick }, selector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardOwner = data.owner._id;
    this._idUser = idUser;
    this._putLike = putLike;
    this._deleteLike = deleteLike;
    this._deleteCard = deleteCard;
    this._handleCardClick = handleCardClick;
    this._selector = selector;
  }

  renderer() {
    this._element = this._getElement();

    this._searchElements(this._element);

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementName.textContent = this._name;

    this._getNumberOfLikes(this._likes);
    this._checkOwnerLike(this._likes);
    this._showTrashOnOwnerCard();
    this._setEventListeners();

    return this._element;
  }

  like(el) {
    this._checkOwnerLike(el);
    this._getNumberOfLikes(el);
  }

  _getElement() {
    return document
      .querySelector(`#${this._selector}Template`)
      .content
      .querySelector(`.${this._selector}`)
      .cloneNode(true);
  }

  _searchElements(element) {
    this._elementImage = element.querySelector('.element__image');
    this._elementName = element.querySelector('.element__name');
    this._elementLikeAmount = element.querySelector('.element__like-amount');
    this._elementLike = element.querySelector('.element__like');
    this._elementRemove = element.querySelector('.element__remove');
  }

  _getNumberOfLikes(el) {
    this._elementLikeAmount.textContent = el.length;
  }

  _checkOwnerLike(el) {
    this._isLike = el.some((el) => {
      return el._id === this._idUser;
    });

    this._toggleLike();
  }

  _toggleLike() {
    if (this._isLike) {
      this._elementLike.classList.add('element__like_active');
    } else {
      this._elementLike.classList.remove('element__like_active');
    }
  }

  _showTrashOnOwnerCard() {
    if (this._cardOwner === this._idUser) {
      this._elementRemove.classList.add('element__remove_active');
    }
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      if (!this._isLike) {
        this._putLike(this._cardId);
      } else {
        this._deleteLike(this._cardId);
      }
    })

    if (this._elementRemove.classList.contains('element__remove_active')) {
      this._elementRemove.addEventListener('click', () => {
        this._deleteCard(this._element, this._cardId);
      })
    }

    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._elementImage);
    })
  }
}
