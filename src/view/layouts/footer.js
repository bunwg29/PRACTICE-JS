export default function footer() {
   return `
     <footer class="pagination-container">
       <div class="pagination-info">
         Rows per page:
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
         <button class="prev-page">&lt;</button>
         <button class="next-page">&gt;</button>
       </div>
     </footer>
   `;
 }