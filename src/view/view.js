import header from "./layouts/header";
import menuTable from "./components/menuTable";
import menuTitle from "./components/menuTitle";
class view {

   constructor() {

   };

   Dashboard() {

      const container = document.createElement('div');
      container.className = 'container';

      const main = document.createElement('main');
      main.className = 'main';
      container.innerHTML += header();
      container.appendChild(main);


      main.innerHTML += menuTable();
      main.innerHTML += menuTitle();

      return container;
   }
};

export default () => new view();

