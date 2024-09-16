export default class AdditionOption {

   constructor() {
     this.currentOpenForm = null;
   }

   displayOption(element) {
     const additionOption = element.querySelector('.addition-option');

      if (additionOption) {

         if (this.currentOpenForm && this.currentOpenForm !== additionOption) {
            this.currentOpenForm.classList.add('hidden');
         }

         additionOption.classList.toggle('hidden');

         if (additionOption.classList.contains('hidden')) {

            this.currentOpenForm = null;

         } else {

            this.currentOpenForm = additionOption;
         }

      }

   }

}
