import './main.scss';
import './router/processRoutes';
import processRoutes from './router/processRoutes';
import UserController from './controllers/userController';
import View from './view/view';

const initApp = () => {
   const userController = new UserController();
   const view = new View();

   userController.setView(view);
   view.setUserController(userController);

   processRoutes(view);

   return {
      userController,
      view
   };
}

const app = initApp();

export default app;
