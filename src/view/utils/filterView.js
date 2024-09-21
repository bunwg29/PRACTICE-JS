// This file use for display form of filter and connect with controller to get data and display corresponding data.
export default class FilterView {

   constructor(userController, view) {
      this.userController = userController;
      this.view = view;
   }

   displayFilter() {
      const filterActive = document.querySelector('.filter-active');

      if (filterActive.classList.contains('hidden')) {
          filterActive.classList.remove('hidden');
      } else {
          filterActive.classList.add('hidden');
      }

      const sortRadios = document.querySelectorAll('input[name="sort"]');
      sortRadios.forEach(radio => {
          radio.addEventListener('change', async () => {
              await this.userController.handleSortChange(radio.value);
              this.view.renderPaginatedContent();
          });
      });

      const userRadios = document.querySelectorAll('input[name="users"]');
      userRadios.forEach(radio => {
          radio.addEventListener('change', async () => {
              await this.userController.handleUserChange(radio.value);
              this.view.renderPaginatedContent();
          });
      });
  }
}

export { FilterView };
