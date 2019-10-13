import SearchItems from '../modules/searchItems';

const LOADING_CLASS_NAME = 'main--loading';

export default class Main {
  constructor() {
    const main = document.createElement('div');
    this.element = main;
    this.searchItems = new SearchItems();
    this.element.appendChild(this.searchItems.element);

    return this;
  }

  set isLoading(bool) {
    if (bool) {
      this.element.classList.add(LOADING_CLASS_NAME);
    } else {
      this.element.classList.remove(LOADING_CLASS_NAME);
    }
  }

  resetSearchItems(data) {
    this.searchItems.resetItems(data.items);
  }
}
