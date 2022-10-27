import Popup from "./Popup.js";

export default class PopupDeleteImage extends Popup {
  constructor(selector, { hendleSubmit }) {
    super(selector);
    this._hendleSubmit = hendleSubmit;
    this._buttonDelete = this._popup.querySelector('.popup__delete');
    this._buttonDeleteText = this._buttonDelete.textContent;
  }

  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._buttonDelete.textContent = loadingText;
    } else {
      this._buttonDelete.textContent = this._buttonDeleteText;
    }
  }

  _addEventListeners() {
    super._addEventListeners();
    this._clickSubmit = this._clickOnSubmit.bind(this);
    this._popup.addEventListener('submit', this._clickSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popup.removeEventListener('submit', this._clickSubmit);
  }

  _clickOnSubmit(evt) {
    evt.preventDefault();
    this._hendleSubmit();
  }
}
