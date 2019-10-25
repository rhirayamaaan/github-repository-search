import AsyncSetTimeout from "./AsyncSetTimeout";

export function throttle(func, delay = 0) {
  let executeTime = -delay;
  let asyncSetTimeout = null;
  let runExecute = false;

  const execute = (...rest) => async () => {
    if (runExecute) {
      return;
    }

    if (asyncSetTimeout instanceof AsyncSetTimeout) {
      asyncSetTimeout.cansel();
    }

    asyncSetTimeout = null;
    executeTime = performance.now();
    const data = await func(...rest);
    runExecute = false;
    return data;
  };

  return async (...rest) => {
    if (executeTime + delay > performance.now()) {
      if (asyncSetTimeout instanceof AsyncSetTimeout) {
        asyncSetTimeout.cansel();
      }

      asyncSetTimeout = new AsyncSetTimeout(
        execute(...rest),
        executeTime + delay - performance.now()
      );
      return await asyncSetTimeout.execute();
    }

    if (asyncSetTimeout === null) {
      return execute(...rest)();
    }
  };
}
