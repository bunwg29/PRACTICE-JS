import routes from "./routes";
import menuHandle from "@/services/handlePath";
import { addCheckboxEventListener } from "@/services/handlePath";

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

   async handleHashChange() {
      const path = this.parseRequestURL();
      await this.navigate(path);
   }

   parseRequestURL() {
      return window.location.pathname.toLowerCase();
   }

   async navigate(path) {
      const found = Object.keys(this.routes).find(route => this.matchRoute(route, path));

      if (found) {

        try {
          document.getElementById('root').innerHTML = '';
          const container = await this.routes[found].template(this.view);
          document.getElementById('root').appendChild(container);
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

      menuHandle();
      addCheckboxEventListener();
    }


   matchRoute(route, path) {
      const routeParts = route.split('/');
      const pathParts = path.split('/');
      if (routeParts.length !== pathParts.length) return false;

      return routeParts.every((part, i) => part.startsWith(':') || part === pathParts[i]);
   }

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
