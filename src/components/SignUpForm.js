import React, { useState } from 'react'
import axios from 'axios';
import { decode } from '../modules/decode';

export default function SignUpForm(props) {
    const [newUser, setNewUser] = useState({
        username: '', 
        password: '',
        name: '',
        helper: false,
        student: false,
    });
    //removed setNewUserEmail and cohort because they are not being used and throwing warnings for unused vars from react. 
    //readd if you need them
    const [newUserEmail] = useState('');
    const [newUserCohort] = useState('');

    // console.log('newUser: ', newUser);
    
    const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value});
        // console.log(newUser);
    }
    const toggleBool = (e) => {
        // console.log('e.target.name: ', e.target.name);
        if (e.target.name === 'helper'){
            setNewUser({...newUser, helper: !newUser.helper});
        }
        else if (e.target.name === 'student'){
            setNewUser({...newUser, student: !newUser.student});
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // e.target.reset();
        // console.log('newUser: ', newUser);
        if(validateInputs()){
            // console.log('SignUpForm.js validateInputs returned true');

            if (newUserEmail !== ''){
                setNewUser({...newUser, email: newUserEmail});
            }
            if (newUserCohort !== ''){
                setNewUser({...newUser, cohort: newUserCohort});
            }

            axios.post('https://ddq.herokuapp.com/api/auth/register', newUser)
            .then(res => {
                // console.log('axios: api/auth/register response: ',res);
                alert('Signed up! Logging in now..');
                axios.post('https://ddq.herokuapp.com/api/auth/login', { username: newUser.username, password: newUser.password})
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
                .catch(err => {console.log('SignUp Login Catch Error: ', err.response.data.error)
                alert(err.response.data.error)});
            })
            .catch(err => {console.log('SignUp Catch Error: ', err.response.data.error)
            alert(err.response.data.error)});
        }
        else{
            console.log('SignUpForm.js validateInputs returned false');
        }
    }

    const validateInputs = () => {
        // console.log('validate Firing');
        if (newUser.username === ''){
            alert('You must enter a username.');
            return false;
        }
        else if (newUser.password === ''){
            alert('You must enter a password.');
            return false;
        }
        else if (newUser.name === ''){
            alert('You must enter your name.');
            return false;
        }
        else if (newUser.helper === false && newUser.student === false){
            alert('You must choose to enroll as a helper, student, or both.');
            return false;
        }
        return true;
    }

    return (
        <div>
            <h2>Sign up for an account</h2>
            <form onSubmit={handleSubmit}>
                <input name='username' onChange={handleChange} placeholder='username'/>
                <br/>
                <input type='password' name='password' onChange={handleChange} placeholder='password'/>
                <br/>
                <input name='name' onChange={handleChange} placeholder='name'/>
                <br/>
                <input type='email' name='email' onChange={handleChange} placeholder='email'/>
                <br/>
                <input name='cohort' onChange={handleChange} placeholder='cohort'/>
                <br/>
                <label>Helper<input type='checkbox' name='helper' onChange={toggleBool} /></label>
                <label>Student<input type='checkbox' name='student' onChange={toggleBool} /></label>
                <br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

