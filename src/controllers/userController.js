import UserModel from "../model/userModel";
import axios from "@/services/getData";
export default class UserController {
   constructor() {
      this.model = new UserModel();
      this.view = null;
   }

   setView(view) {
      this.view = view;
   }

   async fetchAllUsers() {
      await this.model.fetchAllUser();
      return this.applyFiltersAndSort();
   }

   async fetchPaidUsers() {
      await this.model.fetchPaidUser();
      return this.applyFiltersAndSort();
   }

   async fetchUnpaidUsers() {
      await this.model.fetchUnpaidUser();
      return this.applyFiltersAndSort();
   }

   async fetchOverdueUsers() {
      await this.model.fetchOverdueUser();
      return this.applyFiltersAndSort();
   }

   async handleSortChange(sortValue) {
      if (!this.view) {
         console.error('View is not set in UserController');
         return;
      }
      this.model.sortBy = sortValue;

      await this.updateView();
   }

   async handleUserChange(userValue) {
      if (!this.view) {
         console.error('View is not set in UserController');
         return;
      }
      this.model.userFilter = userValue;
      await this.updateView();
   }

   async handleSearch(query) {
      if (!this.view) {
          console.error('View is not set in UserController');
          return;
      }

      this.model.searchQuery = query;
      await this.updateView();
  }


   async getTotalPaidAmount() {
      await this.model.fetchAllUser();
      return this.model.calculateTotalPaidAmount();
   }

   applyFiltersAndSort() {
      let result = [...this.model.users];
      result = this.model.filterUser(result);
      result = this.model.searchUsers(result);
      result = this.model.sortUser(result);
      return result;
   }

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

   async updatePaymentStatus(userId) {
      try {
         const user = await this.model.getUserById(userId);
         if (user && (user.paid_status === "Unpaid" || user.paid_status === "Overdue")) {
            user.paid_status = "Paid";
            user.paid_day = new Date().toISOString().split('T')[0];
            await this.model.updateUser(user);
            // Cập nhật lại dữ liệu local
            await this.fetchAllUsers();
            return true;
         }
         return false;
      } catch (error) {
         console.error("Error updating payment status:", error);
         return false;
      }
   }
}