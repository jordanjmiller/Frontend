import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Account() {
    const { currentUser } = useContext(CurrentUserContext);

    console.log(currentUser);

    return (
        <div>
            <h1>Account details</h1>
            {/* <p>Username: {currentUser.username}</p>
            <p>Helper? {currentUser.helper}</p>
            <p>Student? {currentUser.student}</p>
            <p>Cohort: {currentUser.cohort !== null ? currentUser.cohort : 'Unknown'} </p>
            <p>Email: {currentUser.email !== null ? currentUser.cohort : 'None'} </p> */}

            <button>Edit</button>

{/* This will only render when the edit button is clicked
            <form>
                <label> Username:
                    <input type="text" />
                </label> 
                <label> Cohort:
                    <input type="text" />
                </label>
                <label> Email:
                    <input type="text" />
                </label>
                <label> Helper
                    <input type="checkbox" />
                </label>
                <label> Student
                    <input type="checkbox" />
                </label>
                    <button>Submit</button>
            </form> */}

            <form>
                <label> Old password:
                    <input type="text" />
                </label> 
                <label> New password:
                    <input type="text" />
                </label>
                <label> Retype new password:
                    <input type="text" />
                </label>
                    <button>Submit</button>
            </form>
        </div>
    )
}
