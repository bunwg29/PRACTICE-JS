import header from "./layouts/header";
import menuTable from "./components/menuTable";
import renderAllUser from "./renderAllUser";
import headingTable from "./components/headingTable";
const Dashboard = async () => {
   const container = document.createElement('div');
   container.className = 'container';

   const main = document.createElement('main');
   main.className = 'main';

   container.innerHTML += header();
   container.appendChild(main);

   main.innerHTML += menuTable();

   const tableUser = document.createElement('table');
   tableUser.className = 'list';
   tableUser.innerHTML += headingTable();

   main.appendChild(tableUser);
   try {
      const userHTML = await renderAllUser.renderUser();
      tableUser.querySelector('tbody').innerHTML = userHTML;
      main.appendChild(tableUser);
   } catch (error) {
      console.error("Error when render user:", error);

      tableUser.innerHTML = "Not found";
      main.appendChild(tableUser);
   }

   return container;
}

export default{ Dashboard }
