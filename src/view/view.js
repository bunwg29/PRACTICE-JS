import header from './layouts/header';
import menuTable from './components/menuTable';
import menuTitle from './components/menuTitle';
import renderAllUser from './utils/renderAllUser';
import FilterView from './utils/filterView';
import AdditionOption from './utils/addtionOption';
export default class View {

   constructor() {
      this.userController = null;
      this.currentUsers = [];
      this.additionOption = new AdditionOption();
      this.filterView = null;
    }

    setUserController(userController) {
      this.userController = userController;
      this.filterView = new FilterView(this.userController, this);
    }

   static createMainElement() {
      const main = document.createElement('main');
      main.className = 'main';
      main.innerHTML += menuTable();
      main.innerHTML += menuTitle();
      return main;
   }

   static async renderContent(users, usersElement, main) {
      try {
         const userHTML = renderAllUser.renderUsers(users);
         usersElement.innerHTML = userHTML;
         main.appendChild(usersElement);
      } catch (error) {
         console.error('Error when render user:', error);
         usersElement.innerHTML = 'Not found';
         main.appendChild(usersElement);
      }
   }

   applyViewMoreListeners() {
      const viewMoreButtons = document.querySelectorAll('.viewmore');
      viewMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
          event.stopPropagation();
          const additionElement = event.target.closest('.addition');
          if (additionElement) {
            this.additionOption.displayOption(additionElement);
          }
        });
      });

      document.addEventListener('click', (event) => {
        if (!event.target.closest('.addition') && this.additionOption.currentOpenForm) {
          this.additionOption.currentOpenForm.classList.add('hidden');
          this.additionOption.currentOpenForm = null;
        }
      });
   }

   async renderUserType(fetchFunction) {
      const container = document.createElement('div');
      container.className = 'container';

      const main = View.createMainElement();
      const usersElement = document.createElement('div');
      usersElement.className = 'user';

      container.innerHTML += header();
      container.appendChild(main);

      try {
         this.filterView = new FilterView(this.userController, this);
         const users = await fetchFunction();

         this.currentUsers = users || [];

         await View.renderContent(users, usersElement, main);

         const filterButton = container.querySelector('.menu-left-filter');

         if (filterButton) {
            filterButton.addEventListener('click', () => {
               this.filterView.displayFilter();
            });
         }

         const viewMoreButtons = container.querySelectorAll('.viewmore');
         viewMoreButtons.forEach(button => {
         button.addEventListener('click', (event) => {
            const additionElement = event.target.closest('.addition');
               if (additionElement) {
                  this.additionOption.displayOption(additionElement);
               }
            });
         });

         document.addEventListener('click', (event) => {
            if (!event.target.closest('.addition') && this.additionOption.currentOpenForm) {
               this.additionOption.currentOpenForm.classList.add('hidden');
               this.additionOption.currentOpenForm = null;
            }
         });

      } catch (error) {
         console.error('Error: ', error);
         this.currentUsers = [];
      }

      return container;
   }

   async Dashboard() {
      return this.renderUserType(this.userController.fetchAllUsers.bind(this.userController));
   }

   async PaidContent() {
      return this.renderUserType(this.userController.fetchPaidUsers.bind(this.userController));
   }

   async UnpaidContent() {
      return this.renderUserType(this.userController.fetchUnpaidUsers.bind(this.userController));
   }

   async OverdueContent() {
      return this.renderUserType(this.userController.fetchOverdueUsers.bind(this.userController));
   }

}
