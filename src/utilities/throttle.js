import AsyncSetTimeout from './AsyncSetTimeout';

class ThrottleException {
  constructor(...rest) {
    this.rest = rest;

    return this;
  }
}

export function throttle(func, interval = 0) {
  let executeTime = null; // 実行予定時間
  let asyncSetTimeout = null;
  let executing = false; // func が実行中かどうか判定
  let executeRejector = null; // func の実行を外部から中断するためのもの

  const execute = (...rest) => async () => {
    executing = true;

    // 非同期中に関数実行を中止できるように promise を発行する
    const asyncExecuter = () =>
      new Promise(async (resolve, reject) => {
        executeRejector = reject;
        resolve(await func(...rest));
      });

    return await asyncExecuter()
      .then(done => {
        executing = false;
        return done;
      })
      .catch(throttleException => {
        executing = false;
        if (asyncSetTimeout instanceof AsyncSetTimeout) {
          asyncSetTimeout.reject(throttleException);
        }
      });
  };

  const handler = async (...rest) => {
    // 非同期実行中に再度実行されたら中断
    if (executing && typeof executeRejector === 'function') {
      executeRejector(new ThrottleException(...rest));
      executeRejector = null;
    }

    if (executeTime > performance.now()) {
      // 間引き中ならタイマー削除
      if (asyncSetTimeout instanceof AsyncSetTimeout) {
        asyncSetTimeout.cancel();
      }
      asyncSetTimeout = null;
    } else {
      // 間引きしていないなら実行時間を決定
      executeTime = performance.now() + interval;
    }

    if (asyncSetTimeout === null) {
      asyncSetTimeout = new AsyncSetTimeout(
        execute(...rest),
        executeTime - performance.now() // interval させるタイミングを短くしていく
      );

      return await asyncSetTimeout
        // タイマー後実行
        .execute()
        .then(done => {
          asyncSetTimeout = null;
          return done;
        })
        // 非同期実行中に reject された場合、reject 時の引数の値でリトライする
        .catch(async throttleException => {
          asyncSetTimeout = null;
          return await handler(...throttleException.rest);
        });
    }
  };

  return handler;
}
