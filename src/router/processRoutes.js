import routes from "./routes";

const parseRequestURL = () => {
  let url = location.hash.slice(1).toLowerCase() || '/';
  return url;
};

const router = () => {

  const path = parseRequestURL();

  let found = Object.keys(routes).find(route => {
    const regex = new RegExp(route);
    return regex.test(path);
  });

  if (found) {
    document.getElementById('root').innerHTML = '';
    document.getElementById('root').appendChild(routes[found].template());
  } else {
    document.getElementById('root').innerHTML = '<h3>Not Found</h3>';
  }

};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);