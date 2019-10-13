import Fetcher from '../fetcher';
import Url from '../config/url';
import FetchException from '../fetcher/exception';

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

export class MainEntity {
  constructor(items) {
    this.items = items;
    return this;
  }
}

export class MainErrorEntity {
  constructor(exception) {
    this.status = null;

    if (exception instanceof FetchException) {
      this.status = exception.status;
    }

    return this;
  }
}

export default class MainService {
  constructor() {
    this.repository = new Fetcher(`${Url.SEARCH_API}`);
    return this;
  }

  async get(parameter) {
    try {
      const response = await this.repository.get(parameter);
      return this.mapper(response);
    } catch (error) {
      return new MainErrorEntity(error);
    }
  }

  mapper(response) {
    const Items = new ItemsEntity();

    if (response) {
      for (const item of response.items) {
        Items.append(
            new ItemEntity(
                item.id,
                item.name,
                item.private,
                item.description,
                item.language
            )
        );
      }
    }

    return new MainEntity(Items);
  }
}
