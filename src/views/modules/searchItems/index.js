import './style.scss';

const NAMESPACE = 'searchItems';

const NONE_MODIFIER_CLASSNAME = `${NAMESPACE}--none`;

class SearchItem {
  static createChildElement(name, isPrivate, url, description, language) {
    return `<a class="${NAMESPACE}__link" href="${url}" target="_blank">
    <p class="${NAMESPACE}__name">${name}</p>
    ${isPrivate ? `<p class="${NAMESPACE}__private">Private</p>` : ''}
    ${
      description ?
        `<p class="${NAMESPACE}__description">${description}</p>` :
        ''
}
    ${language ? `<p class="${NAMESPACE}__language">${language}</p>` : ''}
    </a>`;
  }

  constructor(name, isPrivate, url, description, language) {
    const innerHTML = SearchItem.createChildElement(
        name,
        isPrivate,
        url,
        description,
        language
    );

    this.element = document.createElement('li');
    this.element.classList.add(`${NAMESPACE}__item`);
    this.element.innerHTML = innerHTML;

    return this;
  }
}

export default class SearchItems {
  constructor() {
    this.element = document.createElement('ul');
    this.element.classList.add(NAMESPACE);

    this.data = null;

    return this;
  }

  set data(items = null) {
    this.element.innerHTML = '';

    if (items !== null) {
      if (items.length <= 0) {
        return;
      }

      this.element.classList.remove(NONE_MODIFIER_CLASSNAME);

      for (const item of items) {
        this.element.appendChild(
            new SearchItem(
                item.name,
                item.isPrivate,
                item.url,
                item.description,
                item.language
            ).element
        );
      }
    } else {
      this.element.classList.add(NONE_MODIFIER_CLASSNAME);
    }
  }
}
