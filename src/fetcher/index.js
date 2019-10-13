export default class Fetcher {
  constructor(url) {
    this.request = new XMLHttpRequest();
    this.request.responseType = 'json';
    this.url = url;
    this.request.open('GET', url, true);
  }

  async get() {
    return new Promise((resolve, reject) => {
      this.request.onload = () => {
        if (this.request.readyState === 4 && this.request.status === 200) {
          resolve(this.request.response);
        } else {
          reject(new Error(this.request.statusText));
        }
      };

      this.request.onerror = () => {
        reject(new Error(this.request.statusText));
      };

      this.request.onabort = () => {
        resolve(`${this.url} has been aborted`);
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
