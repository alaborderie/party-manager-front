/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react';
import {api} from "../helpers/api";
import {UserContext} from "../contexts/UserContext";
import {Toast, Spinner, Button, Container} from "../components";
import CreateGroup, {GroupInterface} from "../components/CreateGroup";
import EventSummary from "../components/EventSummary";
import {FaPlus} from "react-icons/fa";
import {Flex} from "rebass";
import CreateEvent from "../components/CreateEvent";

function Group(props: any) {
  const [create, setCreate] = useState(false);
  const [group, setGroup] = useState<GroupInterface | null>(null);
  const user = useContext(UserContext);

  useEffect(() => {
    fetchGroup()
      .catch(err =>
        Toast.fire({ title: err.toString(), type: 'error' })
      );
  }, []);

  async function fetchGroup() {
    if (user && user.token) {
      const { id } = props.match.params;
      const { data: { data } } = await api(user.token).get('/groups/' + id);
      setGroup(data);
    }
  }

  function handleClickCreateEvent() {
    setCreate(!create)
  }

  if (!group) {
    return <Spinner />
  }

  return (
    <Container xs={1} sm={1} md={1} lg={1} background_img={group.background_img}>
      <h1>Hello to the group page!</h1>
      <p>Enjoy your stay.</p>
      <Flex>
        <Button
            rounded
            bg="primary0"
            color="success"
            onClick={handleClickCreateEvent}
        >
          <FaPlus color="success" />
        </Button>
      </Flex>
      {create && (
          <React.Fragment>
            <br />
            <hr />
            <br />
            <CreateEvent groupId={group.id} callback={fetchGroup}/>
            <br />
            <hr />
            <br />
          </React.Fragment>
      )}
      {!!group.events ? (
          group.events.map(event => (
              <EventSummary {...event} key={event.id} />
          ))
      ) : ""}
    </Container>
  )
}

export default Group;
