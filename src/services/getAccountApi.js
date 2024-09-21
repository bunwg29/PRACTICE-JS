// This function use for interact with admin account api

import { getAuthUser } from "./apiUserConfig.js";

const userAPI = "http://localhost:3000/auth_users";

const getAccount = () => {

   return getAuthUser(userAPI)
   .then(data => {
      return data;
   })
   .catch(error => {
      onsole.log(error);
   });

}

export {getAccount};