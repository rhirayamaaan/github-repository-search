import Main from './views/layouts/main';
import MainService from './service/main';

import 'normalize.css';
import './style.scss';

(async function() {
  const search = async (_event, query = 'query') => {
    main.isLoading = true;

    const mainResponse = await mainService.get({q: query});

    main.rebind(mainResponse);
    main.isLoading = false;
  };

  const main = new Main(search);
  const mainService = new MainService('query');
  document.querySelector('#app').appendChild(main.element);
})();
