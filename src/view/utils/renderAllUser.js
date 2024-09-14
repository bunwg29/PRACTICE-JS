
const contentInTable = user => {
  return `
      <div class = "list" data-user-id="${user.id}">
         <a class = "checkbox"><img src="../assets/icons/userNonCheckbox.svg" alt="checkbox">
         <a class = "showinfo"><img src="../assets/icons/showProfile.svg" alt="show-profile"></a>

         <div class = "info-name">
            <div class = "info-name__firstname">
               ${user.firstname} ${user.lastname}
            </div>

            <div class = "info-name__email">
               ${user.email}
            </div>
         </div>

         <div class = "info-active">
               <div class = "info-active__status">
                  ${user.active_status}
               </div>

               <div class = "info-active__login">
                  <p>Last login: ${user.last_login}</p>
               </div>
         </div>

         <div class = "info-payment">
               <div class = "info-payment__status">
                  ${user.paid_status}
               </div>

               <div class = "info-payment__day">
                  ${user.paid_day}
               </div>
         </div>



         <div class = "info-amount">
               ${user.amount}
               <p>USD</p>
         </div>
         <button class = "button-viewmore">View More</button>
         <a class = "viewmore" href=""><img src="../assets/icons/viewMoreOption.svg" alt="show-profile"></a>
      </div>
   `;
};

const renderUsers = (users) => {
   try {

      const userElement = users.map(user => contentInTable(user));
      return userElement.join('');

   } catch (error) {

      console.error('Error rendering users', error);
      return 'Error rendering users';

   }
}

export default { renderUsers };
