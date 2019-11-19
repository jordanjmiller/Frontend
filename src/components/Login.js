import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Login(props) {
    const { setCurrentUser } = useContext(CurrentUserContext);
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
            
            // alert(res.data.message);

            //redirect based off of user values
            if (res.data.user.helper){
                props.history.push('/HelperDashboard');
            }
            else{
                props.history.push('/StudentDashboard');
            }
        })
        .catch(err => {console.log('LOGIN CATCH ERROR: ', err.response.data.message)
        alert(err.response.data.message)});
        setUserCredentials({username: '', password: ''})
    }

    return (
        <div>
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
