import React, { useState, useEffect, useContext } from 'react';
import { api } from "../helpers/api";
import { Toast, Spinner, Container } from '../components';
import { EventInterface } from "../components/CreateEvent";
import { UserContext } from "../contexts/UserContext";

function Event(props: any) {
    const [event, setEvent] = useState<EventInterface | null>(null);
    const user = useContext(UserContext);

    useEffect(() => {
        fetchEvent()
            .catch(err =>
                Toast.fire({ title: err.toString(), type: 'error' })
            );
    }, []);

    async function fetchEvent() {
        if (user && user.token) {
            const { id } = props.match.params
            const { data: { data } } = await api(user.token).get('/events/' + id);
            setEvent(data);
        }
    }

    if (!event) {
        return <Spinner />
    }

    return (
        <Container xs={1} sm={1} md={1} lg={1} background_img={event.background_img}>
            <h1>Hello to the Event page!</h1>
            <br />
            <hr />
            <br />
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            {event.place ? <p>Lieu : {event.place}</p> : ""}
            <p>Date de début : {event.start_date}</p>
            <p>Date de fin : {event.end_date}</p>
            <br />
            <hr />
            <br />
            <p>Personnes invitées :</p>
            {!!event.users ? (
                <ul>
                    {event.users.map(user => <li>{user.firstName} {user.lastName}</li>)}
                </ul>
            ) : "Aucune :)"}
        </Container>
    )
}

export default Event;