import UserModel from "../model/userModel";
import renderAllUser from "../view/utils/renderAllUser";
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

   applyFiltersAndSort() {
      let result = [...this.model.users];
      result = this.model.filterUser(result);
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
            // Xóa người dùng khỏi danh sách trong model
            this.model.removeUser(userId);
            await this.updateView(); // Cập nhật lại giao diện sau khi xóa
         }
      } catch (error) {
         console.error('Error deleting user:', error);
      }
   }

   async updateView() {
      const filteredAndSortedUsers = this.applyFiltersAndSort();
      const domElement = document.querySelector('.user');
      if (domElement) {
         domElement.innerHTML = renderAllUser.renderUsers(filteredAndSortedUsers);
         this.view.applyViewMoreListeners();
      }
   }
}