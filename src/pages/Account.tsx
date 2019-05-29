import React, {useContext} from 'react';
import {UserContext} from "../contexts/UserContext";
import Button from "../components/Button";
import {Redirect} from "react-router";
import {Container} from "../components";

function Account() {
  const user = useContext(UserContext);
  if (!user || !user.token) {
    return <Redirect to="/signin" />
  } else {
    return (
      <Container>
        <h1>Bienvenue {user.firstName} {user.lastName} !</h1>
        <Button onClick={user.signOut}>Se déconnecter</Button>
      </Container>
    )
  }
}

export default Account;
