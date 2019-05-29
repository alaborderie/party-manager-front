import React from 'react';
import {Container} from "../components";

function Home() {
  return (
    <Container>
      <h1>Bienvenue sur Party Manager !</h1>
      <h3>Todo: </h3>
      <ul>
        <li>Créer Party</li>
        <li>Rejoindre Party</li>
        <li>Rechercher Party</li>
        <li>Chat</li>
        <li>Checklist</li>
        <li>Gestion droits</li>
      </ul>
    </Container>
  )
}

export default Home;
