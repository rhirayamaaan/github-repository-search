export default class Header {
  static createChildElement() {
    return `
    <h1 class="header__title">Repositoies Search Service for Github</h1>
    <p class="header__search">
    <input
      type="text"
      class="header__searchInput"
      data-headersearch-parts="input"
    >
    <button
      type="search"
      class="header__searchButton"
      data-headersearch-parts="submit"
    >
      検索
    </button>
    </p>`;
  }

  constructor() {
    const root = document.createElement('div');
    root.classList.add('header');

    root.innerHTML = Header.createChildElement();

    this.element = root;
    this.inputElement = root.querySelector('[data-headerSearch-parts="input"]');
    this.submitElement = root.querySelector(
        '[data-headerSearch-parts="submit"]'
    );

    this.hasSearcher = false;

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
