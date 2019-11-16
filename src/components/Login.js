import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { decode } from '../modules/decode';

export default function Login(props) {
    const [userCredentials, setUserCredentials] = useState({username: '', password: ''});
    
    const handleChange = (e) => {
        setUserCredentials({...userCredentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();

        // console.log('Login.js handleSubmit userCredentials:', userCredentials);
        axios.post('https://ddq.herokuapp.com/api/auth/login', userCredentials)
        .then(res => {
            // console.log('axios: api/auth/login response: ', res);
            sessionStorage.setItem('token', res.data.token);
            alert(res.data.message);
            // console.log('Decoded token', decode(res.data.token));
            if (decode(res.data.token).helper){
                props.history.push('/HelperDashboard');
            }
            else{
                props.history.push('/StudentDashboard');
            }
        })
        .catch(err => {console.log('LOGIN CATCH ERROR: ', err.response.data.error)
        alert(err.response.data.error)});
        setUserCredentials({username: '', password: ''})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input name='username' onChange={handleChange} placeholder='username'/>
            <input type='password' name='password' onChange={handleChange} placeholder='password'/>
            <button type='submit'>Submit</button>
            </form>

            <br />
            <p>New here?</p>
            <Link to='/Register'>Register an account</Link>
        </div>
    )
}
