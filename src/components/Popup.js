export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(`#${selector}`);
    this._closeButton = this._popup.querySelector('.popup__close');
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._addEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  _addEventListeners() {
    this._clickCloseButton = this.close.bind(this);
    this._closeButton.addEventListener('click', this._clickCloseButton);

    this._clickOverlay = this._handleOverlayClode.bind(this);
    this._popup.addEventListener('mousedown', this._clickOverlay);

    this._clickEsc = this._handleEscClose.bind(this);
    document.addEventListener('keydown', this._clickEsc);
  }

  _removeEventListeners() {
    this._closeButton.removeEventListener('click', this._clickCloseButton);
    this._popup.removeEventListener('mousedown', this._clickOverlay);
    document.removeEventListener('keydown', this._clickEsc);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') this.close();
  }

  _handleOverlayClode(evt) {
    if (evt.target === evt.currentTarget) this.close();
  }
}
