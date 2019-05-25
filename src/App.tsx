import React, {useEffect, useState} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import axios from 'axios';
import defaultTheme, {darkColors, lightColors} from './theme';

import { Toolbar, Container, NavLink } from './components';
import {IUserContext, UserContext} from "./contexts/UserContext";
import {allRoutes, IRoute, loggedInRoutes, loggedOutRoutes, routes} from "./routes";
import ErrorBoundary from "./components/ErrorBoundary";
import {getUserData} from "./helpers/api";
import {handleAuthError} from "./helpers/errorHandler";
import {IThemeContext} from "./contexts/ThemeContext";

interface IUser {
  email: string;
  password: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<IUserContext | null>(null);
  const [theme, setTheme] = useState<IThemeContext | null>(defaultTheme);
  useEffect(() => {
    getThemeFromLocalStorage();
    getUserFromLocalStorage()
      .catch(console.error);
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

  function getThemeFromLocalStorage() {
    const themeJSON: string | null = localStorage.getItem('partyManagerTheme');
    if (themeJSON) {
      const isDarkTheme = JSON.parse(themeJSON);
      const colors = isDarkTheme ? darkColors : lightColors;
      setTheme({...defaultTheme, colors});
    }
  }

  function renderRouteLink(route: IRoute) {
    return <NavLink to={route.to} key={route.to} exact={route.exact} bg="primary1" p={2}>{route.title}</NavLink>;
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
            bg="primary1"
            color="secondary2"
            title="Party Manager"
            setTheme={setTheme}
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
};

export default App;
