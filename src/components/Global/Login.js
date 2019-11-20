import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Login(props) {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [userCredentials, setUserCredentials] = useState({username: '', password: ''});
    
    const handleChange = (e) => {
        setUserCredentials({...userCredentials, [e.target.name]: e.target.value});
    }
    // console.log(userCredentials);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        // console.log('Login.js handleSubmit userCredentials:', userCredentials);
        //send inputted user credentials and receive auth token and user object
        axios.post('https://ddq.herokuapp.com/api/auth/login', userCredentials)
        .then(res => {
            // console.log('axios: api/auth/login response: ', res);
            sessionStorage.setItem('token', res.data.token);
            setCurrentUser({...res.data.user});
            //redirect to open queue
            props.history.push('/Dashboard/Unassigned');
        })
        .catch(err => {console.log('LOGIN CATCH ERROR: ', err.response.data.message);
        alert(err.response.data.message)});
        setUserCredentials({username: '', password: ''})
    }

    const logout = () => {
        sessionStorage.removeItem('token');
        setCurrentUser('');
        alert('Logged out successfully. Come back soon!');
        props.history.push('/');
    }

    if (currentUser){
        return (
        <div>
            <h2>You're already logged in!</h2>
            <button className="button" onClick={logout}>Sign out</button>
        </div>
        );
    }
    return (
        <div className="login-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input name='username' onChange={handleChange} placeholder='username'/>
                </label>
                <label>
                    Password:
                    <input type='password' name='password' onChange={handleChange} placeholder='password'/>
                </label>
                <button type='submit'>Login</button>
            </form>

            <br />
            <p>New here?</p>
            <Link to='/Register'>Register an account</Link>
        </div>
    )
}

// new endpoint /api/util/username send username in body, returns true if in use, false if not
