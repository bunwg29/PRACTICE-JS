import view from "../view/view";

const routes = {
  '^/': {
    template: view().Dashboard,
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
    template: view().Dashboard, // Hoặc hiển thị trang 404 riêng
  }
};

export default routes;