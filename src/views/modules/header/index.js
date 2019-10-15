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
      <span class="material-icons">search</span>
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
