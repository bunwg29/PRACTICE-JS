const header = () => {

   const totalMoney = 1000;

   return `<header>
      <p class = "heading">TABLE HEADING</p>

      <nav>
         <div class="nav-option">
            <ul>
               <a href="" class="nav-option-1">All</a>
               <a href="" class="nav-option-2">Paid</a>
               <a href="" class="nav-option-3">Unpaid</a>
               <a href="" class="nav-option-4">Overdue</a>
            </ul>
         </div>

         <p class="nav-total-amount">Total payable amount: ${totalMoney}</p>
      </nav>
      </header>
    `;


};


export default header;