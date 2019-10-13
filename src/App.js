import Main from './views/layouts/main';
import MainService from './service/main';

import 'normalize.css';
import './style.scss';

(async function() {
  const search = async (_event, query = 'query') => {
    main.isLoading = true;

    main.rebind(await mainService.get({q: query}));
    main.isLoading = false;
  };

  const main = new Main(search);
  const mainService = new MainService('query');
  document.querySelector('#app').appendChild(main.element);
})();
