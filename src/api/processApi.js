import {getApi} from "./getData.js";

const urlAPI = "http://localhost:3000/user_data";

const getAllUser = () => {
   getApi(urlAPI)
   .then( data => {

      console.log(data);


   })
   .catch (error => {

      console.log(error);

   })
}
const getPaidUser = () => {

   getApi(urlAPI)
   .then( data => {

      const paidUsers = data.filter(user => user.paid_status === "Paid");
      // console.log(paidUsers);

   })
   .catch (error => {

      console.log(error);

   })

};

const getUnPaidUser = () => {
   getApi(urlAPI)
   .then( data => {

      const unpaidUser = data.filter(user => user.paid_status === "Unpaid");
      // console.log(unpaidUser);

   })
   .catch (error => {

      console.log(error);

   })
};

const getOverdueUser = () => {
   getApi(urlAPI)
   .then( data => {

      const overdueUser = data.filter(user => user.paid_status === "Overdue");
      // console.log(overdueUser);

   })
   .catch (error => {

      console.log(error);

   })
}

export {getPaidUser, getUnPaidUser, getOverdueUser};
