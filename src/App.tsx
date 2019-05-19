import React, {useEffect, useState} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import axios from 'axios';
import theme from './theme';

import { Toolbar, Container, NavLink } from './components';
import {IUserContext, UserContext} from "./contexts/UserContext";
import {allRoutes, IRoute, loggedInRoutes, loggedOutRoutes, routes} from "./routes";
import ErrorBoundary from "./components/ErrorBoundary";
import {getUserData} from "./helpers/api";
import {handleAuthError} from "./helpers/errorHandler";

interface IUser {
  email: string;
  password: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<IUserContext | null>(null);

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  async function signIn(values: IUser) {
    try {
      const {data: { data }} = await axios.post('http://localhost:4000/api/login', { session: values});
      const {first_name, last_name, email} = await getUserData(data.user_id, data.token);
      const newUser = {...data, firstName: first_name, lastName: last_name, email};
      setUser(newUser);
      localStorage.setItem('partyManagerUser', JSON.stringify({
        token: data.token,
        id: data.user_id
      }));
    } catch(err) {
      throw err;
    }
  }

  function signOut() {
    setUser(null);
  }

  async function getUserFromLocalStorage() {
    const userJSON: string | null = localStorage.getItem('partyManagerUser');
    if (userJSON) {
      const userInfo = JSON.parse(userJSON);
      try {
        const newUser = await getUserData(userInfo.id, userInfo.token);
        setUser({...newUser, token: userInfo.token});
      } catch(err) {
        handleAuthError(err);
      }
    }
  }

  function renderRouteLink(route: IRoute) {
    return <NavLink to={route.to} key={route.to} exact={route.exact} bg="dark1" p={2}>{route.title}</NavLink>;
  }

  function renderRoute(route: IRoute) {
    return (
      <Route
        path={route.to}
        key={route.to}
        exact={route.exact}
        render={props =>
          <ErrorBoundary>
            <route.component {...props} />
          </ErrorBoundary>
        }
      />
    );
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
