import 'normalize.css';
import './lib/styles/reset.scss';

import Main from './views/layouts/main';
import MainService from './services/main';
import {throttle} from './utilities/throttle';

(async function() {
  const main = new Main();
  const mainService = new MainService('query');

  const throttleMainSerivceGetter = throttle(
      (...rest) => mainService.get(...rest),
      2000
  );

  main.searcher = async (query = '') => {
    main.isLoading = true;
    main.data = {items: null, error: null};
    const data = await throttleMainSerivceGetter({q: query});
    main.data = data;
    main.isLoading = false;
  };

  document.querySelector('#app').appendChild(main.element);
})();
