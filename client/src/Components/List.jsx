import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import Event from "./Event";
function List(props){
    const [events, setEvents] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:4000/events?type=${props.type}`)
        .then((response)=>{
            setEvents(response.data);
        })
        .catch((error)=>{
            console.error("Error: ",error);
        })
    },[])

    return(
        <Container>
            {events.map((events) => (
            <Event id={events.id} event={events.content} type={props.type}></Event>
            ))}
        </Container>
    )
}

export default List;