import FilterView from '../view/utils/filterView';

export default class filterController {
   constructor() {
      this.filterView = null;
   }

   handleFilterClick(filterButton) {
      if (!this.filterView) {

         this.filterView = new FilterView(this);
         this.filterView.render(filterButton);

      } else {

         this.filterView.render(filterButton);
         this.filterView = null;

      }
   }
}
