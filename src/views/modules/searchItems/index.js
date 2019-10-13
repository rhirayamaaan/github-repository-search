import './style.scss';

class SearchItem {
  constructor(name, isPrivate, description, language) {
    const innerHTML = `<p class="searchItems__name">${name}</p>
    ${isPrivate ? '<p class="searchItems__private">Private</p>' : ''}
    <p class="searchItems__description">${description}</p>
    <p class="language">${language}</p>`;

    this.element = document.createElement('li');
    this.element.innerHTML = innerHTML;

    return this;
  }
}

export default class SearchItems {
  constructor() {
    const ul = document.createElement('ul');
    this.element = ul;

    return this;
  }

  resetItems(items) {
    this.element.innerHTML = '';

    if (items && items.length) {
      for (const item of items) {
        this.element.appendChild(new SearchItem(
            item.name,
            item.isPrivate,
            item.description,
            item.language
        ).element);
      }
    }
  }
}
