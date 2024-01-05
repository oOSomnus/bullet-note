//Register.jsx
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {useState} from 'react';
import axios from 'axios';
function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
        .post('http://localhost:4000/register', {
          email,
          password,
        })
        .then((response) => {
          setMessage(response.data.message);
        })
        .catch((error) => {
          setMessage('Error during registration: '+ error.response.data.message);
        })
        };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <Form className="w-100 p-3" style={{ maxWidth: '400px', minWidth:'100px'}} onSubmit={handleSubmit}>
            <p>Register</p>
            <p>{message}</p>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </div>
      );
}
export default Register;