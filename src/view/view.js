import header from "./layouts/header";
import menuTable from "./components/menuTable";
class view {

   constructor() {

   };

   Dashboard() {

      const container = document.createElement('div');
      container.className = 'container';

      const main = document.createElement('main');
      main.className = 'main';

      container.appendChild(main);

      main.innerHTML += header();
      main.innerHTML += menuTable();

      return container;
   }
};

export default () => new view();

