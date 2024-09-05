import { Dashboard, PaidContent, UnpaidContent, OverdueContent } from "../view/view.js";

const routes = {
  '/': {
    template:() => Dashboard(),
  },
  '/paid': {
    template:() => PaidContent(),
  },
  '/unpaid': {
    template:() => UnpaidContent(),
  },
  '/overdue': {
    template: () => OverdueContent(),
  },
  '404': {
   //  template:  // Hoặc hiển thị trang 404 riêng
  }
};

export default routes;