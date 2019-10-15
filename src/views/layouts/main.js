import SearchItems from '../modules/searchItems';
import Header from '../modules/header';
import ErrorMessage from '../modules/errorMessage';

import './style.scss';

const NAMESPACE = 'main';
const LOADING_MODIFIER_CLASSNAME = `${NAMESPACE}--loading`;

export default class Main {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add(NAMESPACE);

    this.childElement = document.createElement('div');
    this.childElement.classList.add(`${NAMESPACE}__loading`);

    this.header = new Header();
    this.searchItems = new SearchItems();
    this.errorMessage = new ErrorMessage();

    this.element.appendChild(this.header.element);
    this.element.appendChild(this.searchItems.element);
    this.element.appendChild(this.errorMessage.element);

    this.element.appendChild(this.childElement);

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
