const createHeader = () => {
   const headerElement = document.createElement('header');
   headerElement.innerHTML = `
      <p class="heading">TABLE HEADING</p>
      <nav>
         <div class="nav-option">
            <ul>
               <a href="" class="nav-option-1">All</a>
               <a href="" class="nav-option-2">Paid</a>
               <a href="" class="nav-option-3">Unpaid</a>
               <a href="" class="nav-option-4">Overdue</a>
            </ul>
         </div>
         <p class="nav-total-amount">Total payable amount: <span id="total-amount">0.00</span> USD</p>
      </nav>
   `;
   return headerElement;
};

const updateTotalAmount = async (headerElement, userController) => {
   try {
      const totalMoney = await userController.getTotalPaidAmount();
      const totalAmountElement = headerElement.querySelector('#total-amount');
      if (totalAmountElement) {
         totalAmountElement.textContent = `$${totalMoney.toFixed(2)}`;
         console.log('Total amount updated in DOM:', totalAmountElement.textContent);
      } else {
         console.error('Total amount element not found in the DOM');
      }
   } catch (error) {
      console.error('Error fetching total paid amount:', error);
   }
};

const header = {
   create: createHeader,
   updateTotalAmount: updateTotalAmount
};

export default header;
