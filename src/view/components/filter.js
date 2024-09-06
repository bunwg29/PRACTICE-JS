const filter = () => {
   return `
      <div class="filter-active">
         <div class="sort">
            <p class="sort-title">SORT BY:</p>
            <ul class="sort-options">
               <li>
                  <label>
                     Default
                     <input type="radio" name="sort" value="default" checked>
                  </label>
               </li>
               <li>
                  <label>
                     First Name
                     <input type="radio" name="sort" value="first-name">
                  </label>
               </li>
               <li>
                  <label>
                     Last name
                     <input type="radio" name="sort" value="last-name">
                  </label>
               </li>
               <li>
                  <label>
                     Due Date
                     <input type="radio" name="sort" value="due-date">
                  </label>
               </li>
               <li>
                  <label>
                     Last Login
                     <input type="radio" name="sort" value="last-login">
                  </label>
               </li>
            </ul>
         </div>

         <div class="users">
            <p class="users-title">USERS:</p>
            <ul class="users-options">
               <li>
                  <label>
                     All
                     <input type="radio" name="users" value="all" checked>
                  </label>
               </li>
               <li>
                  <label>
                     Active
                     <input type="radio" name="users" value="active">
                  </label>
               </li>
               <li>
                  <label>
                     Inactive
                     <input type="radio" name="users" value="inactive">
                  </label>
               </li>
            </ul>
         </div>
      </div>
   `;
}

export default filter;