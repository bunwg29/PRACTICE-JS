// This function use for handle features like: search, split page
import { viewInfoHandle, addCheckboxEventListener } from '@/services/eventHandlers';

export function setupEventListeners(view) {
   const filterButton = view.container.querySelector('.menu-left-filter');
   if (filterButton) {
      filterButton.addEventListener('click', () => {
         view.filterView.displayFilter();
      });
   }

   const itemsPerPageSelect = view.container.querySelector('.items-per-page');
   if (itemsPerPageSelect) {
      itemsPerPageSelect.addEventListener('change', (event) => {
         const newItemsPerPage = parseInt(event.target.value, 10);
         view.pagination.setItemsPerPage(newItemsPerPage);
         view.renderPaginatedContent();
      });
   }

   const prevButton = view.container.querySelector('.prev-page');
   if (prevButton) {
      prevButton.addEventListener('click', () => {
         view.pagination.prevPage();
         view.renderPaginatedContent();
      });
   }

   const nextButton = view.container.querySelector('.next-page');
   if (nextButton) {
      nextButton.addEventListener('click', () => {
         view.pagination.nextPage();
         view.renderPaginatedContent();
      });
   }

   const searchInput = view.container.querySelector('.menu-left-search input');
   if (searchInput) {
      searchInput.addEventListener('input', (event) => {
         const query = event.target.value.trim().toLowerCase();
         view.userController.handleSearch(query);
      });
   }

   document.addEventListener('click', async (event) => {
      if (event.target.classList.contains('menu-pay')) {
         console.log("Pay button clicked");
         const userId = getCurrentUserId();
         console.log("Retrieved user ID:", userId);
         if (userId) {
            const success = await view.userController.updatePaymentStatus(userId);
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

   viewInfoHandle();
   addCheckboxEventListener();
}

function getCurrentUserId() {
   const path = window.location.pathname;
   const match = path.match(/(\d+)$/);
   if (match) {
      console.log("Found user ID:", match[1]);
      return parseInt(match[1]);
   }
   console.log("Could not find user ID in path:", path);
   return null;
}