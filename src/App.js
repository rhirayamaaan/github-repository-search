import 'normalize.css';
import './lib/styles/reset.scss';

import Main from './views/layouts/main';
import MainService from './services/main';
import {throttle} from './utilities/throttle';

(function() {
  const main = new Main();
  const mainService = new MainService();

  const throttleMainSerivceGetter = throttle(
      (...rest) => mainService.get(...rest),
      2000
  );

  main.searcher = async (query = '') => {
    main.isLoading = true;
    main.data = {items: null, error: null};
    main.data = await throttleMainSerivceGetter({q: query});
    main.isLoading = false;
  };

  document.querySelector('#app').appendChild(main.element);
})();
