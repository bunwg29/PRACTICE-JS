
export default class userModel {

   constructor(data) {
     this.id = data.id;
     this.firstname = data.firstname;
     this.lastname = data.lastname;
     this.email = data.email;
     this.active_status = data.active_status;
     this.last_login = data.last_login;
     this.paid_status = data.paid_status;
     this.paid_day = data.paid_day;
     this.amount = data.amount;
   }

 }