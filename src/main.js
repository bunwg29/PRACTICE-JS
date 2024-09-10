import './main.scss';
import './router/processRoutes';
import processRoutes from './router/processRoutes';
import FilterController from './controllers/filterController';
import UserController from './controllers/userController';
import View from './view/view';

const userController = new UserController();

const view = new View(userController);

userController.view = view;
processRoutes(view);