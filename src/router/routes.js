import view from "../view/view.js";

const routes = {
  '^/': {
    template: () => view.Dashboard(),
  },
  '^/paid$': {
   //  template: view().Paid,
  },
  '^/unpaid$': {
   //  template: view().Unpaid,
  },
  '^/overdue$': {
   //  template: view().Overdue,
  },
  '404': {
   //  template:  // Hoặc hiển thị trang 404 riêng
  }
};

export default routes;