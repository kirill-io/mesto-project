import Popup from "./Popup.js";

export default class PopupDeleteImage extends Popup {
  constructor(selector, { hendlerSubmit }) {
    super(selector);
    this._hendlerSubmit = hendlerSubmit;
    this._buttonDelete = this._popup.querySelector('.popup__delete');
  }

  sumbitTextIsUninstalling() {
    this._buttonDelete.textContent = 'Удаление...';
  }

  sumbitTextIsUninstall() {
    this._buttonDelete.textContent = 'Да';
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
    this._hendlerSubmit();
  }
}
