import routes from "./routes";


const parseRequestURL = () => {
   let url = location.hash.slice(1).toLowerCase() || '/';
   return url;
};

const router = async () => {



  const path = parseRequestURL();

  let found = Object.keys(routes).find(route => route === path);

  if (found) {
    try {
      document.getElementById('root').innerHTML = '';

      const container = await routes[found].template();
      document.getElementById('root').appendChild(container);
    } catch (error) {
      console.error("Error when render:", error);
      document.getElementById('root').innerHTML = '<h3>Error when render</h3>';
    }
  } else {
    document.getElementById('root').innerHTML = '<h3>Not Found</h3>';
  }
};

window.addEventListener('hashchange', () => {
   console.log("Hash changed!", location.hash);
   router();
 });
window.addEventListener('load', router);