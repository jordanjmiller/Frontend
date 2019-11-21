import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";
const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    width:100%;
`;
const LoginForm = styled.div `
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: start;

        .card {
            width: 50%;
            margin-top: 40px;
            padding: 5%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        form {

            label {
                display: block;
                padding-bottom: 25px;
            }
        }
    `;

export default function Login(props) {
    const [loading, setLoading] = useState('');
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [userCredentials, setUserCredentials] = useState({username: '', password: ''});
    
    const handleChange = (e) => {
        setUserCredentials({...userCredentials, [e.target.name]: e.target.value});
    }
    // console.log(userCredentials);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        setLoading(true);
        // console.log('Login.js handleSubmit userCredentials:', userCredentials);
        //send inputted user credentials and receive auth token and user object
        axios.post('https://ddq.herokuapp.com/api/auth/login', userCredentials)
        .then(res => {
            // console.log('axios: api/auth/login response: ', res);
            sessionStorage.setItem('token', res.data.token);
            setCurrentUser({...res.data.user});
            setLoading(false);
            //redirect to open queue
            props.history.push('/Dashboard/Unassigned');
        })
        .catch(err => {console.log('LOGIN CATCH ERROR: ', err.response.data.message);
        setLoading(false);
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
        <StyledLoader active={loading} spinner text='Loading...'>   
            <LoginForm className="login-form">
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input class="text-input" placeholder="Username" name='username' onChange={handleChange} placeholder='username'/>
                        </label>
                        <label>
                            <input class="text-input" placeholder="Password" type='password' name='password' onChange={handleChange} placeholder='password'/>
                        </label>
                        <button className="button fullwidth" type='submit'>Login</button>
                    </form>

                    <br />
                    <p>New here?</p>
                    <Link to='/Register'>Register an account</Link>
                </div>
            </LoginForm>
        </StyledLoader>   
    )
}

{/* // new endpoint /api/util/username send username in body, returns true if in use, false if not */}
