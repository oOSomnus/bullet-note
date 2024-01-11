import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form,  } from "react-bootstrap";
import axios from "axios";
import Event from "./Event";
function List(props){
    const [events, setEvents] = useState([]);
    const [adding, setAdding] = useState(false);
    const [addEvent, setAddEvent] = useState("");
    useEffect(()=>{
        axios.get(`http://localhost:4000/events/${props.type}`,{withCredentials:true})
        .then((response)=>{
            setEvents(response.data);
        })
        .catch((error)=>{
            console.error("Error: ",error);
        })
    },[])
    function handleClick(){
        if(adding === false){
            setAdding(true);
        }else{
            setAdding(false);
        }
    }
    function handleSave(){
        window.location.reload();
        axios.post(`http://localhost:4000/events/${props.type}`,{content:addEvent},{withCredentials:true});
    }
    return(
        <Container>
            <Row>
                <Col>
                    <div>{props.type}</div>
                </Col>
            </Row>
            <Row>
                <Col>
                <Button variant="outline-primary" onClick={handleClick}>Add Event</Button>
                </Col>
                {adding ? (
                    <Col>
                        <Form inline>
                        <Form.Control
                            type="text"
                            value={addEvent}
                            onChange={(e) => setAddEvent(e.target.value)}
                        />
                        <Button
                            variant="outline-success"
                            onClick={handleSave}
                            className="ml-2"
                        >
                            Save
                        </Button>
                        </Form>
                    </Col>
                ) : null
                }
            </Row>
            {events.map((event) => (
            <Event key={event.note_id} id={event.note_id} event={event.content} type={props.type}></Event>
            ))}
        </Container>
    )
}

export default List;