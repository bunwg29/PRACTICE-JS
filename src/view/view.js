import homePage from './pages/homePage';


const app = document.getElementById('root');
const home = new homePage();
const header = home.createHeader();
app.appendChild(header);