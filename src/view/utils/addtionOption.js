export default class AdditionOption {

   constructor(userController) {
      this.userController = userController;
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
            this.applyActivateListener(element);
            this.applyDeleteListener(element);
         }

      }

   }

   applyActivateListener(element) {
      const activateButton = element.querySelector('.addition-option-activeUser');
      if (activateButton) {
         activateButton.addEventListener('click', () => {
            const userId = element.closest('.info').dataset.userId;
            if (userId && this.userController) {
               this.userController.activateUser(userId);
            }
         });
      }
   }

   applyDeleteListener(element) {
      const deleteButton = element.querySelector('.addition-option-deleteUser');
      if (deleteButton) {
         deleteButton.addEventListener('click', () => {
            const userId = element.closest('.info').dataset.userId;
            if (userId && this.userController) {
               this.userController.deleteUser(userId); // Gọi hàm deleteUser trong UserController
            }
         });
      }
   }


}
