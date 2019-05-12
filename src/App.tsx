import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import { Toolbar, Container, NavLink } from './components';
import Home from './pages/Home';
import theme from './theme';


const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Toolbar
            bg="dark1"
            color="light2"
            title="Party Manager"
          >
            <NavLink to="/" exact bg="dark1" p={2}>Accueil</NavLink>
          </Toolbar>
          <Container>
            <Switch>
              <Route path="/" exact component={Home} />
            </Switch>
          </Container>
        </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
