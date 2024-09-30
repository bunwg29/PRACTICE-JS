// This function use for interact with admin account api

import { getAuthUser } from "./apiUserConfig.js";

const userAPI = "https://js-server-pr.onrender.com/auth_users";

const getAccount = () => {

   return getAuthUser(userAPI)
   .then(data => {
      return data;
   })
   .catch(error => {
      console.log(error);
   });

}

export {getAccount};