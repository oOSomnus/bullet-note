import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function Heading(){
    return (
        <Container fluid>
            <Row>
                <Col xs={12} lg={6}>
                    <Link to = {"/DandM"} className='btn btn-light justify-content-center d-flex'>Daily And Monthly View</Link>
                </Col>
                <Col xs={12} lg={6}>
                    <Link to = {"/Yearly"} className='btn btn-light justify-content-center d-flex '>Yearly View</Link>
                </Col>
            </Row>
        </Container>
      );
}

export default Heading;