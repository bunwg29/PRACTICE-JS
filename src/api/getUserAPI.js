// This function use for interact with admin account api

import { getAuthUser } from "./apiUserConfig.js";
import { API_ENDPOINTS } from "./config.js";


const getAccount = () => {

   return getAuthUser(API_ENDPOINTS.AUTH_USERS)
   .then(data => {
      return data;
   })
   .catch(error => {
      console.log(error);
   });

}

export {getAccount};