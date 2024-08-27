import {getApi} from "./getData.js";

const urlAPI = "http://localhost:3000/user_data";

const getAllUser = () => {

   return getApi(urlAPI)
   .then( data => {
      return data;
   })
   .catch (error => {
      console.log(error);
   })

}
const getPaidUser = () => {

   return getApi(urlAPI)
   .then( data => {
     return data.filter(user => user.paid_status === "Paid");
   })
   .catch (error => {
      console.log(error);
   })

};

const getUnPaidUser = () => {

   return getApi(urlAPI)
   .then( data => {
      return data.filter(user => user.paid_status === "Unpaid");
   })
   .catch (error => {
      console.log(error);
   })

};

const getOverdueUser = () => {

   return getApi(urlAPI)
   .then( data => {
      return data.filter(user => user.paid_status === "Overdue");
   })
   .catch (error => {
      console.log(error);
   })

}

export {getAllUser, getPaidUser, getUnPaidUser, getOverdueUser};