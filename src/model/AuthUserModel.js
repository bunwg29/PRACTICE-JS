import { getAccount } from "../services/getAccountApi.js";
export default class AuthUserModel {

   constructor(id, username, password, email) {
     this.id = id;
     this.username = username;
     this.password = password;
     this.email = email;
   }

   static async getAllAuthUsers() {
      try {
         const userData = await getAccount();
         return userData.map(user => new AuthUserModel(user.id, user.username, user.password, user.email));
      } catch (error) {
         console.log(error);
         throw error;
      }
   }
}
