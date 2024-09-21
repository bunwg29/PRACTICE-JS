// This function use for render nav, table...

import menuTable from '../components/menuTable';
import menuTitle from '../components/menuTitle';

export function createMainElement() {
   const main = document.createElement('main');
   main.className = 'main';
   main.innerHTML += menuTable();
   main.innerHTML += menuTitle();
   return main;
}