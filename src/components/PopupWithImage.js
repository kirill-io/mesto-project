import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageText = this._popup.querySelector('.popup__image-text');
  }

  open(element) {
    super.open();
    this._popupImage.src = element.src;
    this._popupImage.alt = element.alt;
    this._popupImageText.textContent = element.alt;
  }
}
