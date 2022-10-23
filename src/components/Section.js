export default class Section {
  constructor({ items, renderer }, selector) {
    this._cardsArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._cardsArray.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.append(item);
  }
}
