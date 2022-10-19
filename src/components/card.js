export default class Card {
  constructor({ data, idUser, putLike, deleteLike, deleteCard }, selector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardOwner = data.owner._id;

    this._idUser = idUser;

    this._putLike = putLike;
    this._deleteLike = deleteLike;

    this._deleteCard = deleteCard;

    this._selector = selector;
  }

  renderer() {
    this._element = this._getElement();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

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

  _getNumberOfLikes(el) {
    this._element.querySelector('.element__like-amount').textContent = el.length;
  }

  _checkOwnerLike(el) {
    this._isLike = el.some((el) => {
      return el._id === this._idUser;
    });

    this._toggleLike();
  }

  _toggleLike() {
    if (this._isLike) {
      this._element.querySelector('.element__like').classList.add('element__like_active');
    } else {
      this._element.querySelector('.element__like').classList.remove('element__like_active');
    }
  }

  _showTrashOnOwnerCard() {
    if (this._cardOwner === this._idUser) {
      this._element.querySelector('.element__remove').classList.add('element__remove_active');
    }
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      if (!this._isLike) {
        this._putLike(this._cardId);
      } else {
        this._deleteLike(this._cardId);
      }
    })

    if (this._element.querySelector('.element__remove').classList.contains('element__remove_active')) {
      this._element.querySelector('.element__remove_active').addEventListener('click', () => {
        this._deleteCard(this._element, this._cardId);
      })
    }
  }
}
