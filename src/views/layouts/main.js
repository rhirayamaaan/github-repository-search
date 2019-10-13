import SearchItems from '../modules/searchItems';
import Header from '../modules/header';
import ErrorMessage from '../modules/errorMessage';

const LOADING_CLASS_NAME = 'main--loading';

export default class Main {
  constructor(search) {
    const main = document.createElement('div');
    this.element = main;
    this.header = new Header(search);
    this.searchItems = new SearchItems();
    this.errorMessage = new ErrorMessage();

    this.element.appendChild(this.header.element);
    this.element.appendChild(this.searchItems.element);
    this.element.appendChild(this.errorMessage.element);

    return this;
  }

  set isLoading(bool) {
    if (bool) {
      this.element.classList.add(LOADING_CLASS_NAME);
    } else {
      this.element.classList.remove(LOADING_CLASS_NAME);
    }
  }

  set data(data) {
    this.errorMessage.data = data.error;
    this.searchItems.data = data.items;
  }
}
