import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavHead(){
    return(
        <Navbar expand='lg' className='bg-bodt-light'>
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                alt=""
                src="img/icon.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                Bullet Note
                </Navbar.Brand>
                <div className='justify-content-end d-flex'>
                <Nav.Link as={Link} to="/register" style={{ marginRight: '10px' }} >Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </div>
            </Container>
        </Navbar>
    );
}

export default NavHead;