export default function footer() {
   return `
     <footer class="pagination-container">
       <div class="pagination-info">
         <span class = "pagination-info__content"> Rows per page: </span>
         <select class="items-per-page">
           <option value="10">10</option>
           <option value="20">20</option>
           <option value="50">50</option>
         </select>
       </div>
       <div class="pagination-pages">
         <span class="current-range"></span> of <span class="total-items"></span>
       </div>
       <div class="pagination-controls">
         <button class="prev-page"><img src="../assets/icons/previousePage.svg" alt="pre-option"></button>
         <button class="next-page"><img src="../assets/icons/nextPageOption.svg" alt="next-option"></button>
       </div>
     </footer>
   `;
}
