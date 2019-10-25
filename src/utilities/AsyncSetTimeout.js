export default class AsyncSetTimeout {
  constructor(func, ms) {
    this.timerId;
    this.func = func;
    this.ms = ms;

    return this;
  }

  execute() {
    return new Promise((resolve) => {
      this.timerId = setTimeout(async () => {
        this.timerId = null;
        resolve(await this.func());
      }, this.ms);
    });
  }

  cansel() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}
