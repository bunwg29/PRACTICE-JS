const menuTable = () => {

   return `
      <div class="menu">

         <div class="menu-left">
            <button class="menu-left-filter">
               <img src="../assets/icons/filter.svg" alt="filter-icon">
               <p>Filter</p>
            </button>
            <div class="menu-left-search">
               <img src="../assets/icons/searchOption.svg" alt="search-bar">
               <input type="text" placeholder="Search Users by Name, Email or Date" >
            </div>
         </div>

         <button class="menu-pay">PAY DUES</button>

      </div>
   `;

};

export default menuTable;
