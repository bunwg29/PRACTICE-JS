// This function use for handle number of item in page, calculate total of pages to split.
export default class Pagination {

   constructor(itemsPerPage, totalItems, currentPage = 1) {
     this.itemsPerPage = itemsPerPage;
     this.totalItems = totalItems;
     this.currentPage = currentPage;
     this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
   }

   nextPage() {
     if (this.currentPage < this.totalPages) {
       this.currentPage++;
     }
     return this.currentPage;
   }

   prevPage() {
     if (this.currentPage > 1) {
       this.currentPage--;
     }
     return this.currentPage;
   }

   setItemsPerPage(itemsPerPage) {
     this.itemsPerPage = itemsPerPage;
     this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
     this.currentPage = 1;
   }

   getCurrentPageItems(items) {
     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
     const endIndex = startIndex + this.itemsPerPage;
     return items.slice(startIndex, endIndex);
   }

   getPageInfo() {
     const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
     const endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
     return {
       currentRange: `${startItem}-${endItem}`,
       totalItems: this.totalItems,
       currentPage: this.currentPage,
       totalPages: this.totalPages
     };
   }

}
