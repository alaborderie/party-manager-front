/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react';
import {api} from "../helpers/api";
import {UserContext} from "../contexts/UserContext";
import {Toast, Spinner, Container} from "../components";
import {GroupInterface} from "../components/CreateGroup";

function Group(props: any) {
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

  if (!group) {
    return <Spinner />
  }

  return (
    <Container xs={1} sm={1} md={1} lg={1} background_img={group.background_img}>
      <h1>Hello to the group page!</h1>
      <p>Enjoy your stay.</p>
    </Container>
  )
}

export default Group;
