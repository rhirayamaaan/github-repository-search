import SearchItems from '../modules/searchItems';
import Header from '../modules/header';
import ErrorMessage from '../modules/errorMessage';
import {MainErrorEntity, MainEntity} from '../../service/main';

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

  rebind(data) {
    if (data instanceof MainErrorEntity) {
      this.errorMessage.rebind(data.status);
      this.searchItems.rebind();
    } else if (data instanceof MainEntity) {
      if (data.items <= 0) {
        this.errorMessage.rebind(200, true);
        this.searchItems.rebind();
      } else {
        this.errorMessage.rebind();
        this.searchItems.rebind(data.items);
      }
    } else {
      this.errorMessage.rebind(-1);
      this.searchItems.rebind();
    }
  }
}
