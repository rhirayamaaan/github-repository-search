import SearchItems from '../modules/searchItems';
import Header from '../modules/header';
import ErrorMessage from '../modules/errorMessage';

const NAMESPACE = 'main';
const LOADING_MODIFIER_CLASSNAME = `${NAMESPACE}--loading`;

export default class Main {
  constructor() {
    const main = document.createElement('div');
    main.classList.add(NAMESPACE);
    this.element = main;
    this.header = new Header();
    this.searchItems = new SearchItems();
    this.errorMessage = new ErrorMessage();

    this.element.appendChild(this.header.element);
    this.element.appendChild(this.searchItems.element);
    this.element.appendChild(this.errorMessage.element);

    return this;
  }

  set isLoading(bool) {
    if (bool) {
      this.element.classList.add(LOADING_MODIFIER_CLASSNAME);
    } else {
      this.element.classList.remove(LOADING_MODIFIER_CLASSNAME);
    }
  }

  set data(data) {
    this.errorMessage.data = data.error;
    this.searchItems.data = data.items;
  }

  set searcher(searchFunction) {
    this.header.searcher = searchFunction;
  }
}
