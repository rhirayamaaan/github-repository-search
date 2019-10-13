import './style.scss';

class SearchItem {
  static createChildElement(name, isPrivate, description, language) {
    return `<p class="searchItems__name">${name}</p>
    ${isPrivate ? '<p class="searchItems__private">Private</p>' : ''}
    <p class="searchItems__description">${description}</p>
    <p class="language">${language}</p>`;
  }

  constructor(name, isPrivate, description, language) {
    const innerHTML = SearchItem.createChildElement(
        name,
        isPrivate,
        description,
        language
    );

    this.element = document.createElement('li');
    this.element.innerHTML = innerHTML;

    return this;
  }
}

export default class SearchItems {
  constructor() {
    const ul = document.createElement('ul');
    this.element = ul;

    this.rebind();

    return this;
  }

  rebind(items = null) {
    this.element.innerHTML = '';

    if (items !== null) {
      if (items.length <= 0) {
        return;
      }

      this.element.classList.remove('searchItems--none');

      for (const item of items) {
        this.element.appendChild(
            new SearchItem(
                item.name,
                item.isPrivate,
                item.description,
                item.language
            ).element
        );
      }
    } else {
      this.element.classList.add('searchItems--none');
    }
  }
}
