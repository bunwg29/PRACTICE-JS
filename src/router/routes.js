const routes = {

  '/': {
    template: (view) => view.Dashboard(),
  },
  '/all': {
    template: (view) => view.Dashboard(),
  },
  '/paid': {
    template: (view) => view.PaidContent(),
  },
  '/unpaid': {
    template: (view) => view.UnpaidContent(),
  },
  '/overdue': {
    template: (view) => view.OverdueContent(),
  },
  '404': {
    template: () => '<h3>Not Found</h3>',
  }

};

export default routes;