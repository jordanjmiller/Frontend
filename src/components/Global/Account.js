import React, { useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import styled from 'styled-components';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faUserCircle, faCamera, faImages, faFileVideo} from "@fortawesome/free-solid-svg-icons";
import LoadingOverlay from "react-loading-overlay";

const StyledLoader = styled(LoadingOverlay)`
    width:100%;
`;

const OuterDiv = styled.div `
    width: 100%;
    flex-direction: column;
    align-items: center;
    background: #383651;
    justify-content: center;
`

const Div = styled.div `
    width: 60%;
    flex-direction: column;
    align-items: center;
    background: white;
    margin: 10rem auto;
    padding: 3rem;
    text-align: center;
`
const ProOuter = styled.div `
    width: 100%;
    display: flex;
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

const ImageInput = styled.input `
    opacity: 0;
    position: absolute;
    pointer-events: none;
    width: 1px;
    height: 1px;
`
const DefaultProfile = styled(FontAwesomeIcon) `
    position: absolute;
    width: 200px !important;
    height: 200px;
    /* border-radius: 50%; */
    background: white;


    ${props => props.edit && `
        &:hover {
                cursor: pointer;
                opacity: 0.2;
        }
    `
    }
`

const ProfileImg = styled.div`
    position: absolute;
    /* border-radius: 50%; */
    width: 200px;
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
        
    ${props => props.edit && `
        &:hover {
                cursor: pointer;
                opacity: 0.2;
        }
    `
    }
`
const ProfileWrapper = styled.div `
    width: 200px;
    height: 200px;
    margin: 2rem;
`

const ProfileFilter = styled.div `
    font-family: 'Patua One', sans-serif;
    width: 200px;
    height: 200px;
    /* border-radius: 50%; */
    display: flex;
    font-size: 3.5rem;
    align-items: center;
    justify-content: center;
    .editPicture {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`


export default function Account() {
    const { currentUser } = useContext(CurrentUserContext);
    const [loading, setLoading] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);

    // state for when the user edits their account details
    const [editUserName, setEditUserName] = useState(currentUser.username);
    const [editName, setEditName] = useState(currentUser.name);
    const [editEmail, setEditEmail] = useState(currentUser.email);
    const [editCohort, setEditCohort] = useState(currentUser.cohort);
    const [editHelper, setEditHelper] = useState(currentUser.helper);
    const [editStudent, setEditStudent] = useState(currentUser.student);
    const [newPassword, setNewPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

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

    const handleSubmit = async e => {
        const promises = [];
        e.preventDefault();
        e.target.reset();
        console.log(JSON.stringify(currentUser));
        console.log(currentUser.profile_picture)
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
           try{
            promises.push(axiosWithAuth().put("https://ddq.herokuapp.com/api/users/user", userObj));
        
            if(profilePicture){
                const formData = new FormData();
                formData.append('image', profilePicture);
                console.log(profilePicture);
                console.log(formData);

                if(currentUser.profile_picture){
                    promises.push(axiosWithAuth().put('https://ddq.herokuapp.com/api/users/user/picture', formData));
                }else{
                    promises.push(axiosWithAuth().post('https://ddq.herokuapp.com/api/users/user/picture', formData));
                }
            }
            const response = await axios.all(promises);
            }catch(err){
                console.log("Edit Account Catch Error: ", err.response.data.message);
                alert(err.response.data.message);
            }
        }
    }

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

    // if (!isValidPassword(newPassword)) {
    //     return false;
    //   }
    
        return true;
    };

    

    return (
        <OuterDiv>
        <Div className='card'> 
    <StyledLoader active={loading} spinner text='Uploading...'> 
            {!showEditForm && <>
                    <ProOuter>
                        <ProfileWrapper>
                            {currentUser.profile_picture ? (
                            <ProfileFilter>
                                <div className='editPicture'>
                                    Edit
                                    <FontAwesomeIcon icon={faCamera} className='fa-1x'/>
                                </div>
                                <ProfileImg edit={false} style={{backgroundImage: `url('${currentUser.profile_picture}')`}}/>
                            </ProfileFilter>) : (
                            <ProfileFilter>
                                <div className='editPicture'>
                                    Edit
                                    <FontAwesomeIcon icon={faCamera} className='fa-1x'/>
                                </div>
                                <DefaultProfile edit={false} icon={faUserCircle}/>
                            </ProfileFilter>)}
                        </ProfileWrapper>
                    </ProOuter>
                <p className> <h3 className="bold">Username:</h3> {currentUser.username}</p>
                <p><h3 className="bold">Name:</h3> {currentUser.name}</p>
                <p><h3 className="bold">Email:</h3> {currentUser.email !== null ? currentUser.email : 'None'} </p>
                <p><h3 className="bold">Cohort:</h3> {currentUser.cohort !== null ? currentUser.cohort : 'Unknown'} </p>
            </>}


            {showEditForm && <form onSubmit={handleSubmit}>
            <ImageInput type='file' onChange={e => setProfilePicture(e.target.files[0])} id='imageInput'/>
            <ProOuter>
                <ProfileWrapper>
                    <label htmlFor='imageInput'>{currentUser.profile_picture ? (
                    <ProfileFilter>
                        <div className='editPicture'>
                            Edit
                            <FontAwesomeIcon icon={faCamera} className='fa-1x'/>
                        </div>
                        <ProfileImg  edit={true} style={{backgroundImage: `url('${currentUser.profile_picture}')`}}/>
                    </ProfileFilter>) : (
                    <ProfileFilter>
                        <div className='editPicture'>
                            Edit
                            <FontAwesomeIcon icon={faCamera} className='fa-1x'/>
                        </div>
                        
                        <DefaultProfile edit={true} icon={faUserCircle}/>
                    </ProfileFilter>)}</label>
                </ProfileWrapper>
            </ProOuter>
            <label><h3 className="bold">Username:</h3>    
                <input className="text-input" name="username" onChange={handleChange} placeholder={currentUser.username} type="text"/> 
            </label>
            <div>
                
            </div>
            <label><h3 className="bold">Name:</h3>
                <input className="text-input" name="name" onChange={handleChange} placeholder={currentUser.name} />
            </label>

          

            <label><h3 className="bold">Email:</h3>
                <input className="text-input" name="email" type="email" onChange={handleChange} placeholder={currentUser.email !== null ? currentUser.email : ''} />
            </label> 
            <label><h3 className="bold">Cohort:</h3>
                <input className="text-input" name="cohort" type="text" onChange={handleChange} placeholder={currentUser.cohort !== null ? currentUser.cohort : ''} />
            </label>
                  
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

            <MarginButton className="button" onClick={() => setShowEditForm(!showEditForm)}>{showEditForm && 'Cancel'}{!showEditForm && 'Edit'}</MarginButton>
            </StyledLoader>  
        </Div>
        </OuterDiv>
    )
}
