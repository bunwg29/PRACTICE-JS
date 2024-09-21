import './main.scss';
import './router/processRoutes';
import processRoutes from './router/processRoutes';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import View from './view/view';

const initApp = () => {
   const userController = new UserController();
   const authController = new AuthController();
   const view = new View();

   userController.setView(view);
   authController.setView(view);
   view.setUserController(userController);
   view.authController = authController;

   processRoutes(view);

   return {
      userController,
      authController,
      view
   };
}

const app = initApp();

export default app;
