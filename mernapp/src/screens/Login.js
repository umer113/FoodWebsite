import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar'; // Replace './Navbar' with the correct path to your Navbar component file

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:7200/api/loginuser", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success){
      localStorage.setItem("authToken",json.authToken);
      navigate("/")
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div><Navbar /></div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-success">Login</button>
          <Link to="/signup" className='m-3 btn btn-danger'>Don't have an account?</Link>
        </form>
      </div>
    </>
  );
};

export default Login;

