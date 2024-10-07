const filter = () => {

   const sortOptions = [
     { value: 'default', label: 'Default', checked: true },
     { value: 'first-name', label: 'First Name' },
     { value: 'last-name', label: 'Last Name' },
     { value: 'due-date', label: 'Due Date' },
     { value: 'last-login', label: 'Last Login' }
   ];

   const userOptions = [
     { value: 'all', label: 'All', checked: true },
     { value: 'Active', label: 'Active' },
     { value: 'Inactive', label: 'Inactive' }
   ];


   const createRadioOptions = (options, name) => {
     return options.map(option => `
       <li>
         <label>
           ${option.label}
           <input
             type="radio"
             name="${name}"
             value="${option.value}"
             ${option.checked ? 'checked' : ''}
           >
         </label>
       </li>
     `).join('');
   };

   
   return `
     <div class="filter-active hidden">
       <div class="sort">
         <p class="sort-title">SORT BY:</p>
         <ul class="sort-options">
           ${createRadioOptions(sortOptions, 'sort')}
         </ul>
       </div>

       <div class="users">
         <p class="users-title">USERS:</p>
         <ul class="users-options">
           ${createRadioOptions(userOptions, 'users')}
         </ul>
       </div>
     </div>
   `;
 };

 export default filter;