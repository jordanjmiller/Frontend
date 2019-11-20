import React, { useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import styled from 'styled-components';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const Div = styled.div `
    width: 100%;
    flex-direction: column;
    align-items: center;
`

export default function Account() {
    const { currentUser } = useContext(CurrentUserContext);

    const [showEditForm, setShowEditForm] = useState(false);

    // state for when the user edits their account details
    const [editUserName, setEditUserName] = useState('');
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editCohort, setEditCohort] = useState('');
    const [editHelper, setEditHelper] = useState(currentUser.helper);
    const [editStudent, setEditStudent] = useState(currentUser.student);

    console.log(editHelper)
    // user inputs this so it can be sent to the API in the update request
    const [inputPassword, setInputPassword] = useState('');

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
      };

    const passwordChange = (e) => {
        setInputPassword(e.target.value)
        console.log(inputPassword)
    }

    const handleSubmit = e => {
        e.preventDefault();
        let userObj = { password: inputPassword }
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

        console.log(editUserName)
        console.log(userObj)
        console.log(inputPassword)
        axiosWithAuth()
        .put("https://ddq.herokuapp.com/api/users/user", userObj)
        
    }

    const toggleBool = e => {
        if (e.target.name === "helper") {
          setEditHelper(!currentUser.helper);
          
        } else if (e.target.name === "student") {
          setEditStudent(!currentUser.student);
        }
      };

    

    return (
        <Div>
            <h1>Account details</h1>

        {/* Show initially */}

  

{/* Show button */}
<button onClick={() => setShowEditForm(!showEditForm)}>{showEditForm && 'Cancel'}{!showEditForm && 'Edit'}</button>

            {!showEditForm && <div> 
                <p>User name: {currentUser.username}</p>
                <p>Name: {currentUser.name}</p>
                <p>Email: {currentUser.email !== null ? currentUser.email : 'None'} </p>
                <p>Cohort: {currentUser.cohort !== null ? currentUser.cohort : 'Unknown'} </p>
                <br /><br />
                <p>Helper? {currentUser.helper === true ? 'Yes' : 'No'}</p>
                <p>Student? {currentUser.student === true ? 'Yes' : 'No'}</p>

            </div>}


        {/* Show on button click */}
            {showEditForm && <form onSubmit={handleSubmit}>
            
            <label>User name:
            <input name="username" onChange={handleChange} placeholder={currentUser.username} type="text"/> 
        </label>
        <br /><br />
            <label>Name:
                <input name="name" onChange={handleChange} placeholder={currentUser.name} />
            </label>

            <br /><br />

            <label> Email:
                <input name="email" type="email" onChange={handleChange} placeholder={currentUser.email !== null ? currentUser.email : ''} />
            </label> 
            <br /><br />
            <label> Cohort:
                <input name="cohort" type="text" onChange={handleChange} placeholder={currentUser.cohort !== null ? currentUser.cohort : ''} />
            </label>
            <br /><br />

            <label> Helper
                     <input name="helper" type="checkbox" onChange={toggleBool} />
                </label>
                <label> Student
                    <input name="student" type="checkbox" checked={currentUser.student} onChange={toggleBool} />
                </label>
                <br /><br />
                <br /><br />
            <br /><br />
                <label>
                    Re-enter password:
                    <input type='password' name='password' onChange={passwordChange} placeholder='password'/>
                </label>
                <br /><br />
                <button type="submit">Submit changes</button>

            </form> }

        

    

                
                
          

            {/* <form>
                <p>
                    <label> Old password:
                        <input type="text" />
                    </label> 
                </p>

                <p>
                    <label> New password:
                        <input type="text" />
                    </label>
                </p>
                
                <p>
                    <label> Retype new password:
                        <input type="text" />
                    </label>
                </p>
               
                    <button>Submit</button>
            </form> */}
        </Div>
    )
}
