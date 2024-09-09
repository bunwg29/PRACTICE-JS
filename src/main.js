import './main.scss';
import './router/processRoutes';
import filterController from './controllers/filterController';
import View from './view/view';
import processRoutes from './router/processRoutes';

const controller = new filterController();

const view = new View(controller);

processRoutes(view);