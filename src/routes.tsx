import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Account from "./pages/Account";
import Parties from "./pages/Parties";

export interface IRoute {
  exact?: boolean;
  to: string;
  title: string;
  component: any;
}

export const routes: Array<IRoute> = [
  { exact: true, to: '/', title: 'Accueil', component: Home },
];

export const loggedInRoutes: Array<IRoute> = [
  { to: '/party', title: 'Party!', component: Parties },
  { to: '/account', title: 'Mon compte', component: Account },
];

export const loggedOutRoutes: Array<IRoute> = [
  { to: '/signup', title: 'Créer un compte', component: Signup },
  { to: '/signin', title: 'Se connecter', component: Signin },
];
export const allRoutes: Array<IRoute> = routes.concat(loggedInRoutes).concat(loggedOutRoutes);
