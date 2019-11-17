import React, { useState, useContext } from "react";
import axios from "axios";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function SignUpForm(props) {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    name: "",
    helper: false,
    student: false,
  });
  
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserCohort, setNewUserCohort] = useState('');

  // console.log('newUser: ', newUser);

  const handleChange = e => {
    if (e.target.name === 'email'){
      setNewUserEmail(e.target.value);
    }
    else if (e.target.name === 'email'){
      setNewUserCohort(e.target.value);
    }
    else{
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
    // console.log(newUser);
  };

  const toggleBool = e => {
    // console.log('e.target.name: ', e.target.name);
    if (e.target.name === "helper") {
      setNewUser({ ...newUser, helper: !newUser.helper });
    } else if (e.target.name === "student") {
      setNewUser({ ...newUser, student: !newUser.student });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // e.target.reset();
    console.log('newUser: ', newUser);
    if (validateInputs()) {
      // console.log('SignUpForm.js validateInputs returned true');
      axios
        .post("https://ddq.herokuapp.com/api/auth/register", newUser)
        .then(res => {
          // console.log('axios: api/auth/register response: ',res);
          alert("Signed up! Logging in now..");
          axios
            .post("https://ddq.herokuapp.com/api/auth/login", {
              username: newUser.username,
              password: newUser.password
            })
            .then(res => {
              // console.log('axios: api/auth/login response: ', res);
              setCurrentUser({...res.data.user});
              sessionStorage.setItem("token", res.data.token);
              alert(res.data.message);
              // console.log('Decoded token', decode(res.data.token));

              if (res.data.user.helper) {
                props.history.push("/HelperDashboard");
              } else {
                props.history.push("/StudentDashboard");
            }
            })
            .catch(err => {
              console.log("SignUp Login Catch Error: ", err.response.data.error);
              alert(err.response.data.error);
            });
        })
        .catch(err => {
          console.log("SignUp Catch Error: ", err.response.data.error);
          alert(err.response.data.error);
        });
    // console.log(newUser);
    } else {
      // console.log("SignUpForm.js validateInputs returned false");
    }
  };

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
    // console.log("validate Firing");
    if (newUser.username === "") {
      alert("You must enter a username.");
      return false;
    }
    if (!isValidPassword(newUser.password)) {
      return false;
    }
    if (newUser.name === "") {
      alert("You must enter your name.");
      return false;
    }
    if (newUser.helper === false && newUser.student === false) {
      alert("You must choose to enroll as a helper, student, or both.");
      return false;
    }
    if (newUserEmail !== "") {
      //email is not a required input- to validate check if it is not null then check the data
      //empty strings cannot be sent to the backend as they will be stored incorrectly- 
      //so if email/cohort is empty we will not send them on the user object

      //add to newUser obj since not null
      setNewUser({...newUser, email: newUserEmail})
    }
    if (newUserCohort !== "") {
      //cohort is not a required input- to validate check if it is not null then check the data
      //empty strings cannot be sent to the backend as they will be stored incorrectly- 
      //so if email/cohort is empty we will not send them on the user object

      //add to newUser obj since not null
      setNewUser({...newUser, cohort: newUserCohort});
    }
    return true;
  };

  return (
    <div>
      <h2>Sign up for an account</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" onChange={handleChange} placeholder="username" />
        <br />
        <input name="password" type="password" onChange={handleChange} placeholder="password" />
        <br />
        <input name="name" onChange={handleChange} placeholder="name" />
        <br />
        <input name="email" type="email" onChange={handleChange} placeholder="email" />
        <br />
        <input name="cohort" type="text" onChange={handleChange} placeholder="cohort" />
        <br />
        <label> Helper
          <input name="helper" type="checkbox" onChange={toggleBool} />
        </label>
        <label> Student
          <input name="student" type="checkbox" onChange={toggleBool} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
