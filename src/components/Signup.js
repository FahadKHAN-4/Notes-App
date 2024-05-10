import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home');
        }
    }, [isLoggedIn, navigate]);

    const handleClick = async (e) =>{
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "Post", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password}),
        });
        const result = await response.json();
        console.log(result);

        if (result.success){
            localStorage.setItem('token', result.authtoken); 
            setIsLoggedIn(true);
        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }


    return (
        <div className='my-4'>
            <form onSubmit={handleClick}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="name" className="form-control" name="name" value={credentials.name} onChange={onChange} id="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="password" />
                </div>
                <button type="submit" className="btn btn-primary my-2">Signup</button>
            </form>
        </div>
    )
}

export default Signup
