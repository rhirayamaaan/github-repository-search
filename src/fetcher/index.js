import FetchException from './exception';

const TIMEOUT = 5000;

export default class Fetcher {
  constructor(url) {
    this.request = new XMLHttpRequest();
    this.request.responseType = 'json';
    this.request.timeout = TIMEOUT;
    this.url = url;
  }

  async get(parameter = {}) {
    const stringParameter = Object.entries(parameter)
        .map((element) => `${element[0]}=${encodeURIComponent(element[1])}`)
        .join('&');

    this.request.open('GET', `${this.url}?${stringParameter}`, true);

    return new Promise((resolve, reject) => {
      this.request.onload = () => {
        if (this.request.readyState === 4 && this.request.status === 200) {
          resolve(this.request.response);
        } else {
          reject(
              new FetchException(this.request.status, this.request.statusText)
          );
        }
      };

      this.request.onerror = () => {
        reject(
            new FetchException(this.request.status, this.request.statusText)
        );
      };

      this.request.onabort = () => {
        resolve(
            new FetchException(
                this.request.status,
                `${this.url} has been aborted`,
                true
            )
        );
      };

      this.request.ontimeout = () => {
        reject(new FetchException(this.request.status, 'Timeout Error'));
      };

      this.abort();

      this.request.send(null);
    });
  }

  abort() {
    if (this.request.readyState > 1 && this.request.readyState < 4) {
      this.request.abort();
    }
  }
}
