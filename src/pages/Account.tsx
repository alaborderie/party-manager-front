import React, {useContext} from 'react';
import {UserContext} from "../contexts/UserContext";
import Button from "../components/Button";
import {Redirect} from "react-router";

function Account() {
  const user = useContext(UserContext);
  if (!user || !user.token) {
    return <Redirect to="/signin" />
  } else {
    return (
      <div>
        <h1>Bienvenue {user.firstName} {user.lastName} !</h1>
        <Button onClick={user.signOut}>Se déconnecter</Button>
      </div>
    )
  }
}

export default Account;