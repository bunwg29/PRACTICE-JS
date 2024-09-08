import filter from '../components/filter';

export default class FilterView {
   constructor(controller) {
      this.controller = controller;
      this.filterDropdown = null;
   }

   render(filterButton) {
      if (this.filterDropdown) {
         this.filterDropdown.remove();
         this.filterDropdown = null;
      } else {
         this.filterDropdown = document.createElement('div');
         this.filterDropdown.classList.add('filter-content');
         this.filterDropdown.innerHTML = filter();
         filterButton.appendChild(this.filterDropdown);
         this.attachEventListeners();
      }
   }

   attachEventListeners() {

      document.addEventListener('click', (event) => {
         if (
           this.filterDropdown &&
           !this.filterDropdown.contains(event.target) &&
           !event.target.closest('.menu-left-filter')
         ) {
           this.filterDropdown.remove();
         }
      });

      // const sortRadios = this.filterDropdown.querySelectorAll('input[name="sort"]');
      // sortRadios.forEach(radio => {
      //    radio.addEventListener('change', () => {
      //       this.controller.handleUserFilterChange(radio.value);
      //    });
      // })

      // const userRadios = this.filterDropdown.querySelectorAll('input[name="users"]');
      // userRadios.forEach(radio => {
      //   radio.addEventListener('change', () => {
      //     this.controller.handleUserFilterChange(radio.value);
      //   });
      // });
   }
}

export { FilterView };
