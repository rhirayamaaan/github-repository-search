import AsyncSetTimeout from './AsyncSetTimeout';

class ThrottleException {
  constructor(...rest) {
    this.rest = rest;

    return this;
  }
}

export function throttle(func, delay = 0) {
  let executeTime = null; // 実行予定時間
  let asyncSetTimeout = null;
  let executing = false; // func が実行中かどうか判定
  let rejectAsyncFunction = null; // func の実行を外部から中断するためのもの

  const execute = (...rest) => async () => {
    executing = true;

    // 非同期中に関数実行を中止できるように promise を発行する
    const asyncFunction = () =>
      new Promise(async (resolve, reject) => {
        rejectAsyncFunction = reject;
        resolve(await func(...rest));
      });

    return await asyncFunction()
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

  const controller = async (...rest) => {
    // 非同期実行中に再度実行されたら中断
    if (executing && typeof rejectAsyncFunction === 'function') {
      rejectAsyncFunction(new ThrottleException(...rest));
      rejectAsyncFunction = null;
    }

    if (executeTime > performance.now()) {
      // delay 中ならタイマー削除
      if (asyncSetTimeout instanceof AsyncSetTimeout) {
        asyncSetTimeout.cancel();
      }
      asyncSetTimeout = null;
    } else {
      // delay していないなら実行時間を決定
      executeTime = performance.now() + delay;
    }

    if (asyncSetTimeout === null) {
      asyncSetTimeout = new AsyncSetTimeout(
        execute(...rest),
        executeTime - performance.now() // delay させるタイミングを短くしていく
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
          return await controller(...throttleException.rest);
        });
    }
  };

  return controller;
}
