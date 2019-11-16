import React, { useState } from 'react'

export default function SignUpForm() {
    const [newUser, setNewUser] = useState({
        username: '', 
        password: '',
        name: '',
        helper: false,
        student: false,
    });
    const [email, setEmail] = useState('');
    const [cohort, setCohort] = useState('');

    console.log('newUser: ', newUser);
    
    const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value});
        console.log(newUser);
    }
    const toggleBool = (e) => {
        console.log('e.target.name: ', e.target.name);
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

        if(validateInputs()){
            console.log('it worked no way!- returned true');
        }
        else{
            console.log('it worked no way!- returned false');
        }

        console.log('newUser: ', newUser);
        // axios.post('http://localhost:5000/api/login', userCredentials)
        // .then(res => {
        //     console.log(res);
        //     sessionStorage.setItem('token', res.data.payload);
        //     props.history.push('/FriendsList');
        // })
        // .catch(err => {console.log('LOGIN CATCH ERROR: ', err.response.data.error)
        // alert(err.response.data.error)});
        // setUserCredentials({username: '', password: ''})
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
                <input name='password' onChange={handleChange} placeholder='password'/>
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
//    username: string required
//    password: string required
//    name: string required
//    helper: boolean required
//    student: boolean required
//    email: string optional
//    cohort: string optional

