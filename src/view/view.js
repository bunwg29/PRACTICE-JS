import header from './layouts/header';
import menuTable from './components/menuTable';
import menuTitle from './components/menuTitle';
import renderAllUser from './utils/renderAllUser';

export default class View {
   constructor(controller) {
      this.controller = controller;
   }

   static createMainElement() {
      const main = document.createElement('main');
      main.className = 'main';
      main.innerHTML += menuTable();
      main.innerHTML += menuTitle();
      return main;
   }

   static async renderContent(renderFunction, usersElement, main) {
      try {
         const userHTML = await renderFunction();
         usersElement.innerHTML = userHTML;
         main.appendChild(usersElement);
      } catch (error) {
         console.error('Error when render user:', error);
         usersElement.innerHTML = 'Not found';
         main.appendChild(usersElement);
      }
   }

   async renderUserType(renderFunction) {
      const container = document.createElement('div');
      container.className = 'container';

      const main = View.createMainElement();
      const usersElement = document.createElement('div');
      usersElement.className = 'user';

      container.innerHTML += header();
      container.appendChild(main);

      try {
         await View.renderContent(renderFunction, usersElement, main);

         const filterButton = container.querySelector('.menu-left-filter');
         if (filterButton) {
         filterButton.addEventListener('click', () => {
            this.controller.handleFilterClick(filterButton);
         });
         }
      } catch (error) {
         console.error('Error: ', error);
      }

      return container;
   }

   async Dashboard() {
      return this.renderUserType(renderAllUser.renderUser);
   }

   async PaidContent() {
      return this.renderUserType(renderAllUser.renderPaidUser);
   }

   async UnpaidContent() {
      return this.renderUserType(renderAllUser.renderUnpaidUser);
   }

   async OverdueContent() {
      return this.renderUserType(renderAllUser.renderOverdueUser);
   }
}
