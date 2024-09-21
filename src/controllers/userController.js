// This is class use for get data from userModel and interact with view.

import UserModel from "@/model/userModel";
import axios from "@/services/apiDataConfig";

export default class UserController {
   constructor() {
      this.model = new UserModel();
      this.view = null;
   }

   setView(view) {
      this.view = view;
   }

   // This function use for get all type of data
   async fetchAllUsers() {
      await this.model.fetchAllUser();
      return this.applyFiltersAndSort();
   }

   // This function use for get paid type of data
   async fetchPaidUsers() {
      await this.model.fetchPaidUser();
      return this.applyFiltersAndSort();
   }

   // This function use for get unpaid type of data
   async fetchUnpaidUsers() {
      await this.model.fetchUnpaidUser();
      return this.applyFiltersAndSort();
   }

   // This function use for get overdue type of data
   async fetchOverdueUsers() {
      await this.model.fetchOverdueUser();
      return this.applyFiltersAndSort();
   }

   // This function use for set type of filter and set for model to process and update interface
   async handleSortChange(sortValue) {
      if (!this.view) {
         console.error('View is not set in UserController');
         return;
      }
      this.model.sortBy = sortValue;

      await this.updateView();
   }

   // This function use for set type of filter and set for model to process and update interface
   async handleUserChange(userValue) {
      if (!this.view) {
         console.error('View is not set in UserController');
         return;
      }
      this.model.userFilter = userValue;
      await this.updateView();
   }

   // This function will get input from DOM and transfer to model to define name of user and afterward update interface
   async handleSearch(query) {
      if (!this.view) {
          console.error('View is not set in UserController');
          return;
      }

      this.model.searchQuery = query;
      await this.updateView();
  }


   // This function use for get total amount of money to display
   async getTotalPaidAmount() {
      await this.model.fetchAllUser();
      return this.model.calculateTotalPaidAmount();
   }

   // This function use for call filter function from model and return a result. This result will transfer for view and display data
   applyFiltersAndSort() {
      let result = [...this.model.users];
      result = this.model.filterUser(result);
      result = this.model.searchUsers(result);
      result = this.model.sortUser(result);
      return result;
   }

   // This function use for transfer status of data
   async activateUser(userId) {
      try {
         const response = await axios.patch(`/${userId}`, {
            active_status: "Active"
         });

         if (response.status === 200) {
            const updatedUser = response.data;
            this.model.updateUserStatus(updatedUser);
            await this.updateView();
         }
      } catch (error) {
         console.error('Error activating user:', error);
      }
   }

   async deleteUser(userId) {
      try {
         const response = await axios.delete(`/${userId}`);

         if (response.status === 200) {
            this.model.removeUser(userId);
            await this.updateView();
         }
      } catch (error) {
         console.error('Error deleting user:', error);
      }
   }

   async updatePaymentStatus(userId) {
      try {
         const user = await this.model.getUserById(userId);
         if (user && (user.paid_status === "Unpaid" || user.paid_status === "Overdue")) {
            user.paid_status = "Paid";
            user.paid_day = new Date().toISOString().split('T')[0];
            await this.model.updateUser(user);

            await this.fetchAllUsers();
            return true;
         }
         return false;
      } catch (error) {
         console.error("Error updating payment status:", error);
         return false;
      }
   }

   // This function use for update interface each do a particular function
   async updateView() {

      if (!this.view) {
          console.error('View is not set in UserController');
          return;
      }

      this.view.currentUsers = this.applyFiltersAndSort();

      this.view.pagination.totalItems = this.view.currentUsers.length;
      this.view.pagination.totalPages = Math.ceil(this.view.pagination.totalItems / this.view.pagination.itemsPerPage);

      await this.view.renderPaginatedContent();

   }


}