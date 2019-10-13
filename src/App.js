import Main from './views/layouts/main';
import MainService from './service/main';

import 'normalize.css';
import './style.scss';

(async function() {
  const main = new Main();
  const mainService = new MainService('query');
  main.isLoading = true;

  document.querySelector('#app').appendChild(main.element);

  const mainResponse = await mainService.get();

  main.resetSearchItems(mainResponse);
})();
