import 'normalize.css';
import './lib/styles/reset.scss';

import Main from './views/layouts/main';
import MainService from './services/main';
import { throttle } from './utilities/throttle';

(function() {
  const main = new Main();
  const mainService = new MainService();

  const throttleMainServiceGetter = throttle(
    (...rest) => mainService.get(...rest),
    2000
  );

  const initialMainData = {
    items: null,
    error: null
  };

  main.searcher = async (query = '') => {
    main.isLoading = true;
    main.data = initialMainData;
    await throttleMainServiceGetter({ q: query })
      .then(done => {
        main.data = done;
        main.isLoading = false;
      })
      .catch(() => {});
  };

  document.querySelector('#app').appendChild(main.element);
})();
