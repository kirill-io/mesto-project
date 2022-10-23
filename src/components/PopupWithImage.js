import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(element) {
    super.open();
    this._popup.querySelector('.popup__image').src = element.src;
    this._popup.querySelector('.popup__image').alt = element.alt;
    this._popup.querySelector('.popup__image-text').textContent = element.alt;
  }
}
