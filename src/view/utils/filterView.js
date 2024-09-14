import { addCheckboxEventListener } from "@/services/handlePath";
export default class FilterView {

   constructor(userController) {
      this.userController = userController;
   }

   displayFilter() {
      const filterActive = document.querySelector('.filter-active');

      if(filterActive.classList.contains('hidden')) {
         filterActive.classList.remove('hidden');
      }
      else {
         filterActive.classList.add('hidden');
      }

      const sortRadios = document.querySelectorAll('input[name="sort"]');
      sortRadios.forEach(radio => {
         radio.addEventListener('change', () => {
            this.userController.handleSortChange(radio.value);
            addCheckboxEventListener();
         });
      })

      const userRadios = document.querySelectorAll('input[name="users"]');
      userRadios.forEach(radio => {
        radio.addEventListener('change', () => {
          this.userController.handleUserChange(radio.value);
          addCheckboxEventListener();
        });
      });
   }
}

export { FilterView };
