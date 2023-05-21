export default class Section {
  constructor({ items, renderer }, container) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(container);
  }

  renderItems() {
    this.items.forEach((item) => this.renderer(item));
  }

  addItem(item) {
    this.container.prepend(item); // <--- and here we make a prepend
  }
}
