/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../contexts/UserContext";
import {Redirect} from "react-router";
import {Input, Button, Toast, Container} from "../components";
import {Flex} from "rebass";
import CreateGroup, {GroupInterface} from "../components/CreateGroup";
import {FaPlus} from "react-icons/fa";
import {api} from "../helpers/api";
import Spinner from "../components/Spinner";
import GroupSummary from "../components/GroupSummary";

function Groups(props: any) {
  const [search, setSearch] = useState('');
  const [create, setCreate] = useState(false);
  const [groups, setGroups] = useState<Array<any> | null>(null);
  const user = useContext(UserContext);

  useEffect(() => {
    // Fetch groups
    fetchGroups()
      .catch(err => Toast.fire({ title: err.toString(), type: 'error' }));
  }, []);

  async function fetchGroups() {
    if (user && user.token) {
      try {
        const {data} = await api(user.token).get('/groups');
        setGroups(data.data);
      } catch(err) {
        console.error(err);
        Toast.fire({ title: err.toString(), type: 'error' });
      }
    }
  }

  function handleClickCreateGroup() {
    setCreate(!create);
  }

  function handleChangeSearch(e: any) {
    setSearch(e.target.value);
  }

  function filterGroups(group: GroupInterface) {
    if (
      group.name.toLowerCase().includes(search.toLowerCase()) ||
      group.description.toLowerCase().includes(search.toLowerCase())
    ) {
      return group;
    }
  }

  function handleClickGroup(id: string) {
    props.history.push('/group/' + id);
  }

  if (!user || !user.token) {
    return <Redirect to="/signin" />
  }

  return (
    <Container>
      <h1>Trouvez un groupe à rejoindre !</h1>
      <Flex>
        <Input label="Recherche" value={search} onChange={handleChangeSearch} />
        <Button
          rounded
          bg="primary0"
          color="success"
          onClick={handleClickCreateGroup}
        >
          <FaPlus color="success" />
        </Button>
      </Flex>
      {create && (
        <React.Fragment>
          <br />
          <hr />
          <br />
          <CreateGroup callback={fetchGroups}/>
          <br />
          <hr />
          <br />
        </React.Fragment>
      )}
      {groups === null ? <Spinner /> : (
        groups.filter(filterGroups).map(group => (
          <GroupSummary {...group} key={group.id} onClick={() => handleClickGroup(group.id)} />
        ))
      )}
    </Container>
  )
}

export default Groups;
