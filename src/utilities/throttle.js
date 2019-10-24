import AsyncSetTimeout from './AsyncSetTimeout';

export function throttle(func, delay = 0) {
  let execTime = -delay;
  let asyncSetTimeout = null;
  const execute = (...rest) => async () => {
    asyncSetTimeout = null;
    execTime = performance.now();
    return await func(...rest);
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
    return execute(...rest)();
  };
}
