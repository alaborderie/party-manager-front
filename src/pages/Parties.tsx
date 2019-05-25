import React, {useContext} from 'react';
import {UserContext} from "../contexts/UserContext";
import {Redirect} from "react-router";

function Parties() {
  const user = useContext(UserContext);

  if (!user || !user.token) {
    return <Redirect to="/signin" />
  }

  return (
    <div>
      <h1>Trouvez un Party à rejoindre !</h1>
      <p>TODO:</p>
      <ul>
        <li>Créer Party</li>
        <li>Lister Parties</li>
        <li>Recherche/filtre</li>
      </ul>
    </div>
  )
}

export default Parties;
