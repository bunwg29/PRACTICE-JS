import routes from "./routes";
import { menuHandle ,viewInfoHandle, addCheckboxEventListener } from "@/services/eventHandlers";

class Router {

   constructor(view) {
      this.view = view;
      this.routes = routes;
      this.handleHashChange = this.handleHashChange.bind(this);
      this.init();
   }

   init() {

      window.addEventListener('hashchange', this.handleHashChange);
      window.addEventListener('load', this.handleHashChange);

   }

   // This function use for handle hash when it was changed
   async handleHashChange() {
      const path = this.parseRequestURL();

      const cleanPath = this.removeUserIdFromPath(path);

      if (cleanPath !== path) {
         window.history.replaceState({}, '', cleanPath);
         await this.navigate(cleanPath);
      } else {
         await this.navigate(path);
      }
   }

   // This function use for get path
   parseRequestURL() {
      return window.location.pathname.toLowerCase();
   }

   // This function use for check routes from path and display corresponding interface
   async navigate(path) {
      const found = Object.keys(this.routes).find(route => this.matchRoute(route, path));

      if (found) {

        try {
          document.getElementById('root').innerHTML = '';
          const container = await this.routes[found].template(this.view);
          document.getElementById('root').appendChild(container);

          // If not login and register then do some activity of dashboard interface
          if (found !== '/login' && found !== '/register') {
            menuHandle();
            addCheckboxEventListener();
            viewInfoHandle();
          }
        } catch (error) {
          console.error("Error when rendering:", error);
          document.getElementById('root').innerHTML = '<h3>Error when rendering</h3>';
        }

      } else {

         const newPath = this.removeUserIdFromPath(path);
         if (newPath !== path) {
            window.history.replaceState({}, '', newPath);
            await this.navigate(newPath);
         } else {
            document.getElementById('root').innerHTML = '<h3>Not Found</h3>';
         }

      }
    }


   // This function check current routes and routes in routes.js
   matchRoute(route, path) {
      const routeParts = route.split('/');
      const pathParts = path.split('/');
      if (routeParts.length !== pathParts.length) return false;

      return routeParts.every((part, i) => part.startsWith(':') || part === pathParts[i]);
   }

   /*
      In dashboard have a checkbox activity, when check on it will add id of data on path to handle something else.
      But when user want to reload this path this function will delete id and reload path location before id.
   */
   removeUserIdFromPath(path) {
      const pathParts = path.split('/');

      if (pathParts.length > 1 && /\d+/.test(pathParts[pathParts.length - 1])) {
         pathParts.pop();
      }

      return pathParts.join('/') || '/';
   }

}

export default function processRoutes(view) {

  new Router(view);

}
