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
   '/login': {
     template: (view) => view.LoginForm(),
   },
   '/register': {
     template: (view) => view.RegisterForm(),
   },
   '404': {
     template: () => '<h3>Sập rồi (><)</h3>',
   }
 };

 export default routes;