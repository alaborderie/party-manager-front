import React, {useState} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import axios from 'axios';
import theme from './theme';

import { Toolbar, Container, NavLink } from './components';
import {IUserContext, UserContext} from "./contexts/UserContext";
import {allRoutes, IRoute, loggedInRoutes, loggedOutRoutes, routes} from "./routes";

interface IUser {
  email: string;
  password: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<IUserContext | null>(null);
  async function signIn(values: IUser) {
    try {
      const {data} = await axios.post('http://localhost:4000/api/login', { session: values});
      console.log(data);
      setUser(data);
    } catch(err) {
      throw err;
    }
  }

  function signOut() {
    setUser(null);
  }

  function renderRouteLink(route: IRoute) {
    return <NavLink to={route.to} key={route.to} exact={route.exact} bg="dark1" p={2}>{route.title}</NavLink>;
  }

  function renderRoute(route: IRoute) {
    return <Route path={route.to} key={route.to} exact={route.exact} component={route.component} />
  }

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{...user, signIn, signOut}}>
        <BrowserRouter>
          <Toolbar
            bg="dark1"
            color="light2"
            title="Party Manager"
          >
            {routes.map(renderRouteLink)}
            {
              user
                ? loggedInRoutes.map(renderRouteLink)
                : loggedOutRoutes.map(renderRouteLink)
            }

          </Toolbar>
          <Container>
            <Switch>
              {allRoutes.map(renderRoute)}
            </Switch>
          </Container>
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App;
