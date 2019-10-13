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

const MainErrorMessage = {
  ZERO_MATCH: '検索結果がありませんでした。',
  UNPROCESSABLE_ENTITY: '検索ワードを正しく入力してください。',
  OTHER: '問題が発生しました。',
};

class MainErrorEntity {
  constructor(exception = null, isZeroMatch = false) {
    this.message = null;

    if (exception instanceof FetchException) {
      if (exception.status === 422) {
        this.message = MainErrorMessage.UNPROCESSABLE_ENTITY;
      } else {
        this.message = MainErrorMessage.OTHER;
      }

      return this;
    }

    if (exception instanceof Error) {
      this.message = MainErrorMessage.OTHER;
      return this;
    }

    if (isZeroMatch) {
      this.message = MainErrorMessage.ZERO_MATCH;
      return this;
    }

    return this;
  }
}

export class MainEntity {
  constructor(items = null, exception = null, isZeroMatch = false) {
    this.items = items;
    this.error = new MainErrorEntity(exception, isZeroMatch);

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
      return new MainEntity(null, error);
    }
  }

  mapper(response) {
    const items = new ItemsEntity();

    let isZeroMatch = false;

    if (response) {
      for (const item of response.items) {
        items.append(
            new ItemEntity(
                item.id,
                item.name,
                item.private,
                item.description,
                item.language
            )
        );
      }

      if (items.length <= 0) {
        isZeroMatch = true;
      }
    } else {
      new Error('Response is null or undefined');
    }

    return new MainEntity(items, null, isZeroMatch);
  }
}
