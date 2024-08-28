import header from "./layouts/header";
import menuTable from "./components/menuTable";
import menuTitle from "./components/menuTitle";
import renderAllUser from "./renderAllUser";

const Dashboard = async () => {
   const container = document.createElement('div');
   container.className = 'container';

   const main = document.createElement('main');
   main.className = 'main';

   const usersElement = document.createElement('div');
   usersElement.className = 'user';

   container.innerHTML += header();
   container.appendChild(main);

   main.innerHTML += menuTable();
   main.innerHTML += menuTitle();


   try {
      const userHTML = await renderAllUser.renderUser();
      usersElement.innerHTML = userHTML;
      main.appendChild(usersElement);
   } catch (error) {
      console.error("Error when render user:", error);

      usersElement.innerHTML = "Not found";
      main.appendChild(usersElement);
   }

   return container;
}

export default{ Dashboard }
