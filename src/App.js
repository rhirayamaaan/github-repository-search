import 'normalize.css';
import './lib/styles/reset.scss';
import './style.scss';

import Main from './views/layouts/main';
import MainService from './services/main';

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
