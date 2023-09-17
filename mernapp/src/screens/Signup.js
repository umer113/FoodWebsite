import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
const Signup = () => {
    const [credientials, setcredientials] = useState({
        name: "",
        email: "",
        password: "",
        Geolocation: ""
    })
    const navigate = useNavigate(); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:7200/api/createuser", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" // Correct the case here
            },
            body: JSON.stringify({ name: credientials.name, email: credientials.email, password: credientials.password, location: credientials.Geolocation })
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Enter valid credientials")
        }
        if (json.success){
            navigate("/")
          }
    }
    const onChange = (event) => {
        setcredientials({ ...credientials, [event.target.name]: event.target.value })
    }
    return (
        <>
           <div><Navbar /></div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credientials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" name='email' value={credientials.email} onChange={onChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credientials.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputLocation1" className="form-label">Address</label>
                        <input type="text" className="form-control" name='Geolocation' value={credientials.Geolocation} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </>
    )
}

export default Signup
