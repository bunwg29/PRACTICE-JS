const menuTable = () => {

   return `
      <div class="menu">

         <button class="menu-filter">
            <p><img src="../assets/icons/filter.svg" alt="filter-icon">Filter</p>
         </button>

         <div class="menu-search">
            <img src="../assets/icons/searchOption.svg" alt="search-bar">
            <input type="text" placeholder="Search Users by Name, Email or Date" >
         </div>

         <button class="menu-pay">PAY DUES</button>
      </div>
   `;

};

export default menuTable;
