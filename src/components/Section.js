export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    if (!Array.isArray(items)) {
      this._cardsArray = [items];
    } else {
      this._cardsArray = items;
    }

    this._cardsArray.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
