import header from './layouts/header';
import menuTable from './components/menuTable';
import menuTitle from './components/menuTitle';
import renderAllUser from './utils/RenderUser';
import FilterView from './utils/filterView';
import AdditionOption from './utils/AdditionOption';
import footer from './layouts/footer';
import Pagination from './utils/Pagination';
import { viewInfoHandle, addCheckboxEventListener } from '@/services/eventHandlers';

export default class View {
   constructor() {
      this.userController = null;
      this.currentUsers = [];
      this.additionOption = null;
      this.filterView = null;
      this.pagination = null;
      this.container = null;
   }

   setUserController(userController) {
      this.userController = userController;
      this.filterView = new FilterView(this.userController, this);
      this.additionOption = new AdditionOption(this.userController);
   }

   createMainElement() {
      const main = document.createElement('main');
      main.className = 'main';
      main.innerHTML += menuTable();
      main.innerHTML += menuTitle();
      return main;
   }

   async renderContent(users, usersElement) {
      try {
         const userHTML = renderAllUser.renderUsers(users);
         usersElement.innerHTML = userHTML;
      } catch (error) {
         console.error('Error when render user:', error);
         usersElement.innerHTML = 'Not found';
      }
   }

   applyViewMoreListeners() {
      const viewMoreButtons = this.container.querySelectorAll('.viewmore');
      viewMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
          event.stopPropagation();
          const additionElement = event.target.closest('.addition');
          if (additionElement) {
            this.additionOption.displayOption(additionElement);
          }
        });
      });

      document.addEventListener('click', (event) => {
        if (!event.target.closest('.addition') && this.additionOption.currentOpenForm) {
          this.additionOption.currentOpenForm.classList.add('hidden');
          this.additionOption.currentOpenForm = null;
        }
      });
   }

   updatePagination() {
      const currentRange = this.container.querySelector('.current-range');
      const totalItems = this.container.querySelector('.total-items');
      const prevButton = this.container.querySelector('.prev-page');
      const nextButton = this.container.querySelector('.next-page');

      if (currentRange && totalItems && prevButton && nextButton) {
         const pageInfo = this.pagination.getPageInfo();
         currentRange.textContent = pageInfo.currentRange;
         totalItems.textContent = pageInfo.totalItems;

         prevButton.disabled = pageInfo.currentPage === 1;
         nextButton.disabled = pageInfo.currentPage === pageInfo.totalPages;
      }
   }

   async renderPaginatedContent() {
      const main = this.container.querySelector('.main');
      if (!main) return;

      const usersElement = main.querySelector('.user') || document.createElement('div');
      usersElement.className = 'user';

      const filteredAndSortedUsers = this.userController.applyFiltersAndSort();

      this.currentUsers = filteredAndSortedUsers;

      const paginatedUsers = this.pagination.getCurrentPageItems(this.currentUsers);
      await this.renderContent(paginatedUsers, usersElement);

      if (!main.contains(usersElement)) {
          main.appendChild(usersElement);
      }

      this.updatePagination();
      this.applyViewMoreListeners();
      viewInfoHandle();
      addCheckboxEventListener();
   }



   setupEventListeners() {
      const filterButton = this.container.querySelector('.menu-left-filter');
      if (filterButton) {
         filterButton.addEventListener('click', () => {
            this.filterView.displayFilter();
         });
      }

      const itemsPerPageSelect = this.container.querySelector('.items-per-page');
      if (itemsPerPageSelect) {
         itemsPerPageSelect.addEventListener('change', (event) => {
            const newItemsPerPage = parseInt(event.target.value, 10);
            this.pagination.setItemsPerPage(newItemsPerPage);
            this.renderPaginatedContent();
         });
      }

      const prevButton = this.container.querySelector('.prev-page');
      if (prevButton) {
         prevButton.addEventListener('click', () => {
            this.pagination.prevPage();
            this.renderPaginatedContent();
         });
      }

      const nextButton = this.container.querySelector('.next-page');
      if (nextButton) {
         nextButton.addEventListener('click', () => {
            this.pagination.nextPage();
            this.renderPaginatedContent();
         });
      }

      const searchInput = this.container.querySelector('.menu-left-search input');
         if (searchInput) {
            searchInput.addEventListener('input', (event) => {
               const query = event.target.value.trim().toLowerCase();
               this.userController.handleSearch(query);
            });
         }
         document.addEventListener('click', async (event) => {
            if (event.target.classList.contains('menu-pay')) {
               console.log("Pay button clicked");
               const userId = this.getCurrentUserId();
               console.log("Retrieved user ID:", userId);
               if (userId) {
                  const success = await this.userController.updatePaymentStatus(userId);
                  if (success) {
                     console.log("Payment status updated successfully");
                     window.location.reload();
                  } else {
                     alert('Failed to update payment status. User may already be paid or not found.');
                  }
               } else {
                  console.error("Could not determine user ID");
                  alert('Could not determine user ID. Please make sure you are on a valid user page.');
               }
            }
         });
   }

   getCurrentUserId() {
      const path = window.location.pathname;
      // Tìm kiếm bất kỳ số nào ở cuối URL
      const match = path.match(/(\d+)$/);
      if (match) {
         console.log("Found user ID:", match[1]);
         return parseInt(match[1]);
      }
      console.log("Could not find user ID in path:", path);
      return null;
   }

   async renderUserType(fetchFunction) {
      this.container = document.createElement('div');
      this.container.className = 'container';

      const headerElement = header.create();
      await header.updateTotalAmount(headerElement, this.userController);
      this.container.appendChild(headerElement);

      const main = this.createMainElement();
      this.container.appendChild(main);

      try {
         this.filterView = new FilterView(this.userController, this);
         const users = await fetchFunction();


         this.currentUsers = users || [];
         this.pagination = new Pagination(10, this.currentUsers.length);

         this.container.innerHTML += footer();

         await this.renderPaginatedContent();
         this.setupEventListeners();



      } catch (error) {
         console.error('Error: ', error);
         this.currentUsers = [];
      }

      return this.container;
   }

   async Dashboard() {
      return this.renderUserType(this.userController.fetchAllUsers.bind(this.userController));
   }

   async PaidContent() {
      return this.renderUserType(this.userController.fetchPaidUsers.bind(this.userController));
   }

   async UnpaidContent() {
      return this.renderUserType(this.userController.fetchUnpaidUsers.bind(this.userController));
   }

   async OverdueContent() {
      return this.renderUserType(this.userController.fetchOverdueUsers.bind(this.userController));
   }
}