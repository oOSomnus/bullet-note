import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout(){
    const navigate = useNavigate();
    useEffect(()=>{
        axios.post('http://localhost:4000/logout')
        .then(()=>{
            navigate('/');
        })
        .catch((err)=>{
            console.log(err);
        });
    },[])
    return(
        <p>logging you out ...</p>
    )
}

export default Logout;