const filter = () => {
   return `
      <div class="filter">

         <div class="filter-sort">
            <p class = "filter-title">SORT BY:</p>
            <button class="filter-sort-default">
               <p>Default</p>
               <img class="img-option-empty" src="./assets/icons/optionEmpty.svg" alt="Option optionEmpty">
            </button>

            <button class="filter-sort-first">
               <p>First Name</p>
               <img class="img-option-empty" src="./assets/icons/optionEmpty.svg" alt="Option optionEmpty">
            </button>

            <button class="filter-sort-last">
               <p>Last Name</p>
               <img class="img-option-empty" src="./assets/icons/optionEmpty.svg" alt="Option optionEmpty">
            </button>

            <button class="filter-sort-due">
               <p>Due Date</p>
               <img class="img-option-empty" src="./assets/icons/optionEmpty.svg" alt="Option optionEmpty">
            </button>

            <button class="filter-sort-last">
               <p>Last Login</p>
               <img class="img-option-empty" src="./assets/icons/optionEmpty.svg" alt="Option optionEmpty">
            </button>

         </div>

         <div class="filter-users">
            <p class = "filter-title">USERS:</p>
            <button class="filter-users-all">
               <p>All</p>
               <img class="img-option-empty" src="./assets/icons/optionEmpty.svg" alt="Option optionEmpty">
            </button>

            <button class="filter-users-active">
               <p>Active</p>
               <img class="img-option-empty" src="./assets/icons/optionEmpty.svg" alt="Option optionEmpty">
            </button>

            <button class="filter-users-inactive">
               <p>Inactive</p>
               <img class="img-option-empty" src="./assets/icons/optionEmpty.svg" alt="Option optionEmpty">
            </button>

         </div>

      </div>
   `;
}

export default filter;