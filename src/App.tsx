import React, {useState} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import axios from 'axios';
import { Toolbar, Container, NavLink } from './components';
import Home from './pages/Home';
import Signup from './pages/Signup';
import theme from './theme';
import Signin from "./pages/Signin";
import {IUserContext, UserContext} from "./contexts/UserContext";

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

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{...user, signIn, signOut}}>
        <BrowserRouter>
          <Toolbar
            bg="dark1"
            color="light2"
            title="Party Manager"
          >
            <NavLink to="/" exact bg="dark1" p={2}>Accueil</NavLink>
            {
              user ? '' : (
                <React.Fragment>
                  <NavLink to="/signup" bg="dark1" p={2}>Créer un compte</NavLink>
                  <NavLink to="/signin" bg="dark1" p={2}>Se connecter</NavLink>
                </React.Fragment>
              )
            }

          </Toolbar>
          <Container>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/signin" component={Signin} />
            </Switch>
          </Container>
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App;
