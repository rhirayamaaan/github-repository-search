import AsyncSetTimeout from './AsyncSetTimeout';

export function throttle(func, delay = 0) {
  let execTime = -delay;
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
    execTime = performance.now();
    const data = await func(...rest);
    runExecute = false;
    return data;
  };

  return async (...rest) => {
    if (execTime + delay > performance.now()) {
      if (asyncSetTimeout instanceof AsyncSetTimeout) {
        asyncSetTimeout.cansel();
      }

      asyncSetTimeout = new AsyncSetTimeout(
          execute(...rest),
          execTime + delay - performance.now()
      );
      return await asyncSetTimeout.execute();
    }

    if (asyncSetTimeout === null) {
      return execute(...rest)();
    }
  };
}
