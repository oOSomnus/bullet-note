import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";

function DailyEvent(props) {
  const [areButtonsVisible, setButtonsVisibility] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [modifiedEvent, setModifiedEvent] = useState(props.event);

  const handleModify = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Make a request to the server to update the event with modified data
    axios
      .put(`http://localhost:4000/${props.type}/${props.id}`, { event: modifiedEvent })
      .then((response) => {
        // Handle success, e.g., update state or notify the user
        console.log("Event modified successfully");
        setEditing(false);
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error("Error modifying event", error);
      });
  };

  const handleCancel = () => {
    setEditing(false);
    setModifiedEvent(props.event);
  };

  const handleDelete = () => {
    // Make a request to the server to delete the event with props.id
    axios
      .delete(`http://localhost:4000/${props.type}/${props.id}`)
      .then((response) => {
        // Handle success, e.g., update state or notify the user
        console.log("Event deleted successfully");
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error("Error deleting event", error);
      });
  };

  return (
    <Container>
      <Row>
        <Col
          onMouseEnter={() => setButtonsVisibility(true)}
          onMouseLeave={() => setButtonsVisibility(false)}
        >
          {areButtonsVisible && !isEditing && (
            <>
              <Button
                variant="outline-primary"
                onClick={handleModify}
                className="mr-2"
              >
                Modify
              </Button>{" "}
              <Button variant="outline-danger" onClick={handleDelete}>
                Delete
              </Button>{" "}
            </>
          )}
          {isEditing ? (
            <Form inline>
              <Form.Control
                type="text"
                value={modifiedEvent}
                onChange={(e) => setModifiedEvent(e.target.value)}
              />
              <Button
                variant="outline-success"
                onClick={handleSave}
                className="ml-2"
              >
                Save
              </Button>{" "}
              <Button
                variant="outline-secondary"
                onClick={handleCancel}
                className="ml-2"
              >
                Cancel
              </Button>{" "}
            </Form>
          ) : (
            <span>{props.event}</span>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default DailyEvent;
