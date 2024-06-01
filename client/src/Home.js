import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";


export default function Home() {
  const [auth,setAuth] = useState(false);
  const [name,setName] = useState("");
  const [message,setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8800")
    .then(res => {
      if(res.data.status === "Success"){
        setAuth(true);
        setName(res.data.name)
      }
      else{
        setAuth(false);
        setMessage(res.data.message)
      }
    })
  }, []);
  const handleLogout = () => {
    axios.get("http://localhost:8800/logout")
    .then(res => {
      if(res.data.status === "Success"){
        window.location.reload(true);
      }else {
        alert("error")
      }

    })
    .then(err => console.log(err))
    
  }


  return (
    <div className='container mt-4'>
      {
        auth ? 
        <div>
          <h3>You are Authorized {name}</h3>
          <button className='btn btn-danger' 
          onClick={handleLogout}>Logout</button>

        </div>
        : 
        <div>
          <h3>{message}</h3>
          <h3>Login Now</h3>
          <Link to="/login" className='btn btn-primary'>Login</Link>
        </div>
      }
      
    </div>
  )
}
