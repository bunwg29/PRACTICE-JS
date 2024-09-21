import { getAccount } from "../services/getAccountApi.js";
import { authUsersApi } from "@/services/apiUserConfig.js";
export default class AuthUserModel {

   constructor(id, username, password, email) {
     this.id = id;
     this.username = username;
     this.password = password;
     this.email = email;
   }

   // Use for get all admin account
   static async getAllAuthUsers() {
      try {
         const userData = await getAccount();
         return userData.map(user => new AuthUserModel(user.id, user.username, user.password, user.email));
      } catch (error) {
         console.log(error);
         throw error;
      }
   }

   // Use for add new admin account
   static async addUser(newUser) {
      try {
        const response = await authUsersApi.post('', newUser);
        return response.data;
      } catch (error) {
        console.error('Error adding new user:', error);
        throw error;
      }
   }

}
