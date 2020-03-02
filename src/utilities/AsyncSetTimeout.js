export default class AsyncSetTimeout {
  constructor(func, ms) {
    this.timerId;
    this.func = func;
    this.ms = ms;
    this.rejector = null;

    return this;
  }

  execute() {
    return new Promise((resolve, reject) => {
      // reject の関数を外部化
      this.rejector = reject;

      this.timerId = setTimeout(async () => {
        this.cancel();
        resolve(await this.func());
        this.rejector = null;
      }, this.ms);
    });
  }

  /**
   * cancel
   * @description タイマーを止めたいだけのときに使用
   */
  cancel() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * reject
   * @param {...any} rest
   * @description reject して catch に流した上でタイマーを止めるときに使用
   */
  reject(...rest) {
    if (typeof this.rejector === 'function') {
      this.rejector(...rest);
      this.rejector = null;
    }

    this.cancel();
  }
}
