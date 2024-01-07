//LoginForm.jsx
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm(){
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
      e.preventDefault();

      axios
      .post('http://localhost:4000/login', {
       email: email,
       password: password,
      })
      .then((response) => {
        console.log(response);
        navigate('/');
      })
      .catch((error) => {
        setMessage('Error during login: '+ error.response.data.message||error);
      })
      };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <Form className="w-100 p-3" style={{ maxWidth: '400px', minWidth:'100px'}} onSubmit={handleSubmit}>
            <p>Login</p>
            <p>{message}</p>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Form.Text className="text-muted"/>
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

export default LoginForm;