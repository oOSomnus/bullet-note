import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
function NavHead(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      axios.get('http://localhost:4000/login/check')
      .then((response)=>{
        console.log(response.data);
        setIsAuthenticated(response.data.authenticated);
        
      })
      .catch((error)=>{
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      })
    });
    
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
                
                {isAuthenticated ?(
                   <Nav.Link as={Link} to="/logout">Logout</Nav.Link>  )
                :(
                    <div className='justify-content-end d-flex'>
                    <Nav.Link as={Link} to="/register" style={{ marginRight: '10px' }} >Register</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </div> 
                )
}
                
            </Container>
        </Navbar>
    );
}

export default NavHead;