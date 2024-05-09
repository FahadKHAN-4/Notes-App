import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleClick = async (e) =>{
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "Post", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
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
                <div class="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" class="form-control" name="email" value={credentials.email} onChange={onChange} id="email"  />
                </div>
                <div class="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" class="form-control" name="password" value={credentials.password} onChange={onChange} id="password" />
                </div>
                <button type="submit" class="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default Login
