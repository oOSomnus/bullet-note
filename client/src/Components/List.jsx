import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Event from "./Event";
function List(props){
    const [events, setEvents] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:4000/events/${props.type}`,{withCredentials:true})
        .then((response)=>{
            setEvents(response.data);
        })
        .catch((error)=>{
            console.error("Error: ",error);
        })
    },[])

    return(
        <Container>
            <Row>
                <Col>
                <Button variant="outline-primary">Add Event</Button>
                </Col>
            </Row>
            {events.map((events) => (
            <Event id={events.id} event={events.content} type={props.type}></Event>
            ))}
        </Container>
    )
}

export default List;