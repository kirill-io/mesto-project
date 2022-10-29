import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, { hendleSubmit }) {
    super(selector);
    this._hendleSubmit = hendleSubmit;
    this._buttonSave = this._popup.querySelector('.popup__save');
    this._submitButtonText = this._buttonSave.textContent;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._buttonSave.textContent = loadingText;
    } else {
      this._buttonSave.textContent = this._submitButtonText;
    }
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _getInputValues() {
    this._inputsValue = {};
    this._inputs.forEach((input) => {
      this._inputsValue[input.name] = input.value;
    });
    return this._inputsValue;
  }

  _addEventListeners() {
    super._addEventListeners();
    this._clickSubmit = this._submitForm.bind(this);
    this._popup.addEventListener('submit', this._clickSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popup.removeEventListener('submit', this._clickSubmit);
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._hendleSubmit(this._getInputValues());
  }
}
