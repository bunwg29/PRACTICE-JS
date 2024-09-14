
const contentInTable = user => {

   const activityHistory = Array.isArray(user.activity) ? user.activity.map(activity => `
     <div class="activity-info">
       <div class="activity-date">${activity.date}</div>
       <div class="activity-description">${activity.user_activity}</div>
       <div class="activity-detail">${activity.detail}</div>
     </div>
   `).join('') : '';

   return `
       <div class="list-user">

         <div class="info" data-user-id="${user.id}">
            <a class="checkbox"><img src="../assets/icons/userNonCheckbox.svg" alt="checkbox"></a>
            <a class="showinfo"><img src="../assets/icons/showProfile.svg" alt="show-profile"></a>

            <div class="info-name">
               <div class="info-name__firstname">
                  ${user.firstname} ${user.lastname}
               </div>
               <div class="info-name__email">
                  ${user.email}
               </div>
            </div>

            <div class="info-active">
               <div class="info-active__status">
                  ${user.active_status}
               </div>
               <div class="info-active__login">
                  <p>Last login: ${user.last_login}</p>
               </div>
            </div>

            <div class="info-payment">
               <div class="info-payment__status">
                  ${user.paid_status}
               </div>
               <div class="info-payment__day">
                  ${user.paid_day}
               </div>
            </div>

            <div class="info-amount">
               ${user.amount}
               <p>USD</p>
            </div>
            <button class="button-viewmore">View More</button>
            <a class="viewmore"><img src="../assets/icons/viewMoreOption.svg" alt="show-profile"></a>
         </div>


          <div class="activity">
             <div class="activity-header">
               <div>DATE</div>
               <div>USER ACTIVITY</div>
               <div>DETAIL</div>
             </div>
             ${activityHistory}
          </div>
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
