import AuthController from '@/controllers/AuthController';
import FilterView from './utils/filterView';
import Pagination from './utils/Pagination';
import AdditionOption from './utils/AdditionOption';
import header from './layouts/header';
import footer from './layouts/footer';
import { createMainElement } from './utils/MainElement';
import { renderContent } from './utils/ContentRenderer';
import { setupEventListeners } from './utils/EventSetup';
import AuthView from './AuthView';

export default class View {
   constructor() {
      this.userController = null;
      this.currentUsers = [];
      this.additionOption = null;
      this.filterView = null;
      this.pagination = null;
      this.container = null;
      this.authController = new AuthController();
      this.authController.setView(this);
      this.authView = new AuthView(this.authController);
   }

   setUserController(userController) {
      this.userController = userController;
      this.filterView = new FilterView(this.userController, this);
      this.additionOption = new AdditionOption(this.userController);
   }

   async checkAuth() {
      if (!this.authController.isLoggedIn()) {
         window.location.pathname = '/login';
         return false;
      }
      return true;
   }

   async renderUserType(fetchFunction) {
      if (!(await this.checkAuth())) return;

      this.container = document.createElement('div');
      this.container.className = 'container';

      const headerElement = header.create();
      await header.updateTotalAmount(headerElement, this.userController);
      this.container.appendChild(headerElement);

      const main = createMainElement();
      this.container.appendChild(main);

      try {
         this.filterView = new FilterView(this.userController, this);
         const users = await fetchFunction();

         this.currentUsers = users || [];
         this.pagination = new Pagination(10, this.currentUsers.length);

         this.container.innerHTML += footer();
         await this.renderPaginatedContent();
         setupEventListeners(this);

      } catch (error) {
         console.error('Error: ', error);
         this.currentUsers = [];
      }

      return this.container;
   }

   async renderPaginatedContent() {
      await renderContent(this);
   }

   async LoginForm() {
      return this.authView.LoginForm();
   }

   async RegisterForm() {
      return this.authView.RegisterForm();
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