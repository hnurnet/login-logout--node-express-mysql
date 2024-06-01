import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router';


axios.defaults.withCredentials = true;
export default function Login() {
  const [values,setValues] = useState({email:"",password:""});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8800/login", values)
    .then(res => {
      if(res.data.status === "Success"){
        navigate("/");
        console.log(res);
      }
      else{
        alert(res.data.message)

      }
    })
    .catch(err => console.log(err))
  }
  
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
     <div className='bg-white p-3 rounded w-50'>
     <h2>Sing-in</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label><strong>Email</strong></label>
          <input type='email' placeholder='Enter Email' name='email' autoComplete='off' 
          className='form-control rounded-0' onChange={e => setValues({...values,email: e.target.value})}/>
        </div>
        <div className='mb-3'>
          <label><strong>Password</strong></label>
          <input type='password' placeholder='Enter Password' name='password' autoComplete='off' 
          className='form-control rounded-0' onChange={e => setValues({...values,password: e.target.value})}/>
        </div>
        <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
        <p className='text-center'>You are agree to our terms and policies</p>
        <button className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</button>
      </form>
     </div>
      
    </div>
  )
}
