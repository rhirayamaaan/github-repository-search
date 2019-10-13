import Main from './views/layouts/main';
import MainService from './service/main';

import 'normalize.css';
import './style.scss';

(async function() {
  const main = new Main();
  const mainService = new MainService('query');

  main.searcher = async (query = 'query') => {
    main.isLoading = true;
    main.data = await mainService.get({q: query});
    main.isLoading = false;
  };

  document.querySelector('#app').appendChild(main.element);
})();
