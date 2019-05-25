import React, {useContext, useState} from 'react';
import {UserContext} from "../contexts/UserContext";
import {Redirect} from "react-router";
import {Input, Button} from "../components";
import {Flex} from "rebass";
import CreateEvent from "../components/CreateEvent";

function Parties() {
  const [search, setSearch] = useState('');
  const [create, setCreate] = useState(false);
  const user = useContext(UserContext);

  function handleClickCreateParty() {
    setCreate(!create);
  }

  if (!user || !user.token) {
    return <Redirect to="/signin" />
  }

  return (
    <div>
      <h1>Trouvez un groupe à rejoindre !</h1>
      <Flex>
        <Input label="Recherche" value={search} onChange={(e: any) => setSearch(e.target.value)} />
        <Button
          rounded
          bg="primary0"
          color="success"
          onClick={handleClickCreateParty}
        >
          +
        </Button>
      </Flex>
      {create && (
        <React.Fragment>
          <br />
          <hr />
          <br />
          <CreateEvent/>
          <br />
          <hr />
          <br />
        </React.Fragment>
      )}
      <p>Recherche : {search}</p>
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
