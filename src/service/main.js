import Fetcher from '../fetcher';
import Url from '../config/url';

class ItemEntity {
  constructor(id, name, isPrivate, description, language) {
    this.id = id;
    this.name = name;
    this.isPrivate = isPrivate;
    this.description = description;
    this.language = language;

    return this;
  }
}

class ItemsEntity extends Array {
  constructor() {
    super();
    return this;
  }

  append(item) {
    this.push(item);
  }
}

class MainEntity {
  constructor(items) {
    this.items = items;
    return this;
  }
}

export default class MainService {
  constructor(query) {
    this.repository = new Fetcher(`${Url.SEARCH_API}?q=${query}`);
    return this;
  }

  async get() {
    const response = await this.repository.get();
    return this.mapper(response);
  }

  mapper(response) {
    const Items = new ItemsEntity();

    if (response) {
      for (const item of response.items) {
        Items.append(new ItemEntity(
            item.id,
            item.name,
            item.private,
            item.description,
            item.language
        ));
      }
    }

    return new MainEntity(Items);
  }
}
