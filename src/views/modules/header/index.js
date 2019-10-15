import './style.scss';

const NAMESPACE = 'header';

export default class Header {
  static createChildElement() {
    return `
    <div class="${NAMESPACE}__inner">
    <h1 class="${NAMESPACE}__title">
      Repositoies Search Service for Github
    </h1>
    <p class="${NAMESPACE}__search">
    <input
      type="text"
      class="${NAMESPACE}__searchInput"
      data-${NAMESPACE}-parts="input"
      placeholder="Search to..."
    >
    <button
      type="search"
      class="${NAMESPACE}__searchButton"
      data-${NAMESPACE}-parts="submit"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="header__searchButtonIcon"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    </button>
    </p>
    </div>`;
  }

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add(NAMESPACE);
    this.element.innerHTML = Header.createChildElement();
    this.inputElement = this.element.querySelector(
        `[data-${NAMESPACE}-parts="input"]`
    );
    this.submitElement = this.element.querySelector(
        `[data-${NAMESPACE}-parts="submit"]`
    );

    this.hasSearcher = false;

    this.inputElement.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        this.submitElement.click();
        this.inputElement.blur();
      }
    });

    return this;
  }

  set searcher(submitFunction) {
    if (this.hasSearcher) {
      return;
    }

    this.submitElement.addEventListener(
        'click',
        () => submitFunction(this.inputElement.value),
        false
    );

    this.hasSearcher = true;
  }
}
