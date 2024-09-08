
import routes from "./routes";

const parseRequestURL = () => {
   let url = location.hash.slice(1).toLowerCase() || '/';
   return url;
};

const router = async (view) => {

  const path = parseRequestURL();
  let found = Object.keys(routes).find(route => route === path);

  if (found) {
      try {
         document.getElementById('root').innerHTML = '';

         const container = await routes[found].template(view);
         document.getElementById('root').appendChild(container);

      } catch (error) {

         console.error("Error when render:", error);
         document.getElementById('root').innerHTML = '<h3>Error when render</h3>';

      }
   }  else {

      document.getElementById('root').innerHTML = '<h3>Not Found</h3>';

   }
};

export default function processRoutes(view) {

  window.addEventListener('hashchange', () => {
    router(view);
  });

  window.addEventListener('load', () => {
    router(view);
  });

}

