import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [userCredentials, setUserCredentials] = useState({username: '', password: ''});
    
    const handleChange = (e) => {
        setUserCredentials({...userCredentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();

        console.log('Login.js handleSubmit userCredentials:', userCredentials);
        axios.post('/login', userCredentials)
        .then(res => {
            console.log(res);
            sessionStorage.setItem('token', res.data.payload);
            // props.history.push('/dashboard');
        })
        .catch(err => {console.log('LOGIN CATCH ERROR: ', err.response.data.error)
        alert(err.response.data.error)});
        setUserCredentials({username: '', password: ''})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input name='username' onChange={handleChange} placeholder='username'/>
            <input name='password' onChange={handleChange} placeholder='password'/>
            <button type='submit'>Submit</button>
            </form>

            <br />
            <p>New here?</p>
            <Link to='/Register'>Register an account</Link>
        </div>
    )
}
