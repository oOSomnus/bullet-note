import { Col, Container, Row } from "react-bootstrap";
import List from "./List";
import NavHead from "./NavHead";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function DandM(){
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:4000/login/check',{withCredentials:true})
        .then((response)=>{
          console.log(response.data.authenticated);
          const status = response.data.authenticated;
          if(status === false)
          {
            navigate('/');
          }
        })
        .catch((error)=>{
          console.error('Error checking authentication:', error);
        })
      },[]);
    return(
        <>
        <NavHead/>
        <Container>
            <Row>
                <Col><List type="daily_notes"/></Col>
                <Col><List type="monthly_notes"/></Col>
            </Row>
        </Container>
        </>
    )
}

export default DandM;