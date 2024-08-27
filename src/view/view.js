import header from "./layouts/header";
import menuTable from "./components/menuTable";
import menuTitle from "./components/menuTitle";
import userController from "../controllers/userController";

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
      const userHTML = await userController.renderUser();
   usersElement.innerHTML = userHTML;
   main.appendChild(usersElement);
   } catch (error) {
   console.error("Error when render user:", error);

   usersElement.innerHTML = "404";
   main.appendChild(usersElement);
   }

   return container;
}

export default{ Dashboard }
