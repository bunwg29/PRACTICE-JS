// This is AuthController class use for get data from AuthUserModel and interact with view

import AuthUserModel from '@/model/AuthUserModel';

export default class AuthController {

   constructor() {
      this.view = null;
   }

   setView(view) {
      this.view = view;
   }

   // This function use for get admin acount from api
   async login(username, password) {
      try {
         const users = await AuthUserModel.getAllAuthUsers();
         const user = users.find(u => u.username === username && u.password === password);

         if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
         }

         return false;
      } catch (error) {
         console.error('Login error!', error);
         return false;
      }
   }


   // This function use for add a new account into api
   async register(username, password, email) {
      try {
         const users = await AuthUserModel.getAllAuthUsers();
         const existingUser = users.find(u => u.username === username || u.email === email);

         if (existingUser) {
            return false;
         }

         const newId = Math.max(...users.map(u => u.id)) + 1;
         const newUser = new AuthUserModel(newId, username, password, email);

         const addedUser = await AuthUserModel.addUser(newUser);

         if (addedUser) {
            return true;
         }

         return false;

      } catch (error) {
         console.error('Register error!', error);
         return false;
      }
   }


   logout() {
      localStorage.removeItem('currentUser');
   }

   // Check account in localStorage
   isLoggedIn() {
      return localStorage.getItem('currentUser') !== null;
   }

}
