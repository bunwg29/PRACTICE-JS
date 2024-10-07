// This function use for interact with data interface api

import { getApi } from "./apiDataConfig";

import { API_ENDPOINTS } from "./config.js";

const getAllUser = () => {

   return getApi(API_ENDPOINTS.USER_DATA)
   .then( data => {
      return data;
   })
   .catch (error => {
      console.log(error);
   })

}
const getPaidUser = () => {

   return getApi(API_ENDPOINTS.USER_DATA)
   .then( data => {
     return data.filter(user => user.paid_status === "Paid");
   })
   .catch (error => {
      console.log(error);
   })

};

const getUnPaidUser = () => {

   return getApi(API_ENDPOINTS.USER_DATA)
   .then( data => {
      return data.filter(user => user.paid_status === "Unpaid");
   })
   .catch (error => {
      console.log(error);
   })

};

const getOverdueUser = () => {

   return getApi(API_ENDPOINTS.USER_DATA)
   .then( data => {
      return data.filter(user => user.paid_status === "Overdue");
   })
   .catch (error => {
      console.log(error);
   })

}

export {getAllUser, getPaidUser, getUnPaidUser, getOverdueUser};