import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, { hendlerSubmit }) {
    super(selector);
    this._hendlerSubmit = hendlerSubmit;
    this._buttonSave = this._popup.querySelector('.popup__save');
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }

  sumbitTextIsSaving() {
    this._buttonSave.textContent = 'Сохранение...';
  }

  sumbitTextIsSave() {
    this._buttonSave.textContent = 'Сохранить';
  }

  _getInputValues() {
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._inputsValue = {};
    this._inputs.forEach((input) => {
      this._inputsValue[input.name] = input.value;
    });
    return this._inputsValue;
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
    this._hendlerSubmit(this._getInputValues());
  }
}
