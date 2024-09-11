import {
   getAllUser,
   getPaidUser,
   getUnPaidUser,
   getOverdueUser,
} from '../services/processApi.js';

export default class UserModel {
   constructor() {
     this.users = [];
     this.sortBy = 'default';
     this.userFilter = 'all';
   }

   async fetchAllUser() {
      try {
         this.users = await getAllUser();
      } catch (error) {
         console.log("Error when get fetch", error);
      }
   }
z
   async fetchPaidUser() {
      try {
         this.users = await getPaidUser();
      } catch (error) {
         console.log("Error when get fetch", error);
      }
   }

   async fetchUnpaidUser() {
      try {
         this.users = await getUnPaidUser();
      } catch (error) {
         console.log("Error when get fetch", error);
      }
   }

   async fetchOverdueUser() {
      try {
         this.users = await getOverdueUser();
      } catch (error) {
         console.log("Error when get fetch", error);
      }
   }

   sortUser(users) {
      const copyUsers = [...users];

      switch (this.sortBy) {
         case 'first-name':
           return copyUsers.sort((a, b) => a.firstname.localeCompare(b.firstname));
         case 'last-name':
           return copyUsers.sort((a, b) => a.lastname.localeCompare(b.lastname));
         case 'due-date':
           return copyUsers.sort((a, b) => new Date(a.paid_day) - new Date(b.paid_day));
         case 'last-login':
           return copyUsers.sort((a, b) => new Date(b.last_login) - new Date(a.last_login));
         case 'default':
         default:
            return copyUsers;
      }
   }

   filterUser(users) {
      if (this.userFilter === 'all') {
         return [...users];
      } else {
         return users.filter(user => user.active_status === this.userFilter);
      }
   }
}