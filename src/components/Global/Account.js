// need to add an alert if password is wrong, or error messages from server

import React, { useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import styled from 'styled-components';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const Div = styled.div `
    width: 100%;
    flex-direction: column;
    align-items: center;
`

const MarginButton = styled.button `
    margin-top: 25px;
`

const PasswordDiv = styled.div `
    margin-top: 50px;
    font-style: italic;
    color: #BF0033;
`

export default function Account() {
    const { currentUser } = useContext(CurrentUserContext);

    const [showEditForm, setShowEditForm] = useState(false);

    // state for when the user edits their account details
    const [editUserName, setEditUserName] = useState(currentUser.username);
    const [editName, setEditName] = useState(currentUser.name);
    const [editEmail, setEditEmail] = useState(currentUser.email);
    const [editCohort, setEditCohort] = useState(currentUser.cohort);
    const [editHelper, setEditHelper] = useState(currentUser.helper);
    const [editStudent, setEditStudent] = useState(currentUser.student);
    const [newPassword, setNewPassword] = useState('');

    // console.log(editHelper)
    // user inputs this so it can be sent to the API in the update request
    const [verifyPassword, setVerifyPassword] = useState('');

    const handleChange = e => {
        if (e.target.name === 'username'){
            setEditUserName(e.target.value);
        }
        else if (e.target.name === 'name'){
            setEditName(e.target.value);
        }
        else if (e.target.name === 'email'){
            setEditEmail(e.target.value);
        }
        else if (e.target.name === 'cohort'){
            setEditCohort(e.target.value);
        }
        else if (e.target.name === 'newPassword'){
            setNewPassword(e.target.value);
        }
      };

    const passwordChange = (e) => {
        setVerifyPassword(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        e.target.reset();
        
        let userObj = { password: verifyPassword }
        if (editUserName){
            userObj = {...userObj, username: editUserName}
        }
        if (editName){
            userObj = {...userObj, name: editName}
        }
        if (editEmail){
            userObj = {...userObj, email: editEmail}
        }
        if (editCohort){
            userObj = {...userObj, cohort: editCohort}
        }
        if (newPassword){
            userObj = {...userObj, newPassword: newPassword}
        }
        

        // console.log(editUserName)
        // console.log(userObj)
        
        if (validateInputs()) {
        axiosWithAuth()
        .put("https://ddq.herokuapp.com/api/users/user", userObj)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log("Edit Account Catch Error: ", err.response.data.message);
            alert(err.response.data.message);
        })
        
    }
}

    // this isn't working 

    // const toggleBool = e => {
    //     if (e.target.name === "helper") {
    //       setEditHelper(!currentUser.helper);
          
    //     } else if (e.target.name === "student") {
    //       setEditStudent(!currentUser.student);
    //     }
    //   };

    const isValidPassword = password => {
    if (password === "") {
        alert("You must enter a password.");
        return false;
    }
    if (password.length < 5 || password.length > 20) {
        alert("Password cannot be less than 5 or greater than 20 characters");
        return false;
    }
    if (!/(!|@|#|\$|&|\*|%|^)/.test(password)) {
        alert("Password must contain at least one special character");
        return false;
    }
    if (!/([A-Z])/.test(password)) {
        alert("Password must contain at least one capitalized letter");
        return false;
    }
    if (!/([0-9])/.test(password)) {
        alert("Password must contain at least one number");
        return false;
    }
    return true;
    };

      
    const validateInputs = () => {
    if (editUserName === "") {
        alert("Your username can't be empty.");
        return false;
    }
    else if(!(/^[a-z][a-z0-9_]*$/i.test(editUserName))) {
        alert("Username must start with a letter and may only contain a-z, _, or numbers.");
        return false;
    }
    if (editName === "") {
        alert("You must enter your name.");
        return false;
    }
    // if (editHelper === false && editStudent === false) {
    //     alert("You must choose to enroll as a helper, student, or both.");
    // //     return false;
    // }
    // if (!isValidPassword(newPassword)) {
    //     return false;
    //   }
    
    return true;
    };

    

    return (
        <Div>
     {/* Show initially */}

            {!showEditForm && <div> 
                <p><h3 className="bold">Username:</h3> {currentUser.username}</p>
                <p><h3 className="bold">Name:</h3> {currentUser.name}</p>
                <p><h3 className="bold">Email:</h3> {currentUser.email !== null ? currentUser.email : 'None'} </p>
                <p><h3 className="bold">Cohort:</h3> {currentUser.cohort !== null ? currentUser.cohort : 'Unknown'} </p>
                {/* <p>Helper? {currentUser.helper === true ? 'Yes' : 'No'}</p>
                <p>Student? {currentUser.student === true ? 'Yes' : 'No'}</p> */}

            </div>}


        {/* Show on button click */}
            {showEditForm && <form onSubmit={handleSubmit}>

            <label><h3 className="bold">Username:</h3>
            <input className="text-input" name="username" onChange={handleChange} placeholder={currentUser.username} type="text"/> 
        </label>
       
            <label><h3 className="bold">Name:</h3>
                <input className="text-input" name="name" onChange={handleChange} placeholder={currentUser.name} />
            </label>

          

            <label><h3 className="bold">Email:</h3>
                <input className="text-input" name="email" type="email" onChange={handleChange} placeholder={currentUser.email !== null ? currentUser.email : ''} />
            </label> 
           
            <label><h3 className="bold">Cohort:</h3>
                <input className="text-input" name="cohort" type="text" onChange={handleChange} placeholder={currentUser.cohort !== null ? currentUser.cohort : ''} />
            </label>
         

            {/* <label> Helper
                     <input name="helper" type="checkbox" onChange={toggleBool} />
                </label>
                <label> Student
                    <input name="student" type="checkbox" checked={currentUser.student} onChange={toggleBool} />
                </label> */}
              
                <label><h3 className="bold">New password:</h3>
            <input className="text-input" name="newPassword" onChange={handleChange} placeholder='' type="text"/> 
        </label>
           <PasswordDiv>
                <label>
                    <p>Re-enter password to save changes:</p>
                    <input className="text-input" type='password' name='password' onChange={passwordChange} />
                </label>
            </PasswordDiv> 
                <br /><br />
                <button className="button" type="submit">Submit changes</button>

            </form> }

        {/* Show button */}
<MarginButton className="button" onClick={() => setShowEditForm(!showEditForm)}>{showEditForm && 'Cancel'}{!showEditForm && 'Edit'}</MarginButton>


        </Div>
    )
}
