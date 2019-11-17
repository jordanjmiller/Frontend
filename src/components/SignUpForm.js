import React, { useState } from "react";
import axios from "axios";
import { decode } from "../modules/decode";

export default function SignUpForm(props) {
  const [newUser, setNewUser] = useState({
    username: "test",
    password: "Password21@",
    name: "Ray",
    helper: false,
    student: false,
    email: "test@test",
    cohort: "web"
  });
  //removed setNewUserEmail and cohort because they are not being used and throwing warnings for unused vars from react.
  //readd if you need them
  // const [newUserEmail] = useState('');
  // const [newUserCohort] = useState('');

  // console.log('newUser: ', newUser);

  const handleChange = e => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
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
              console.log(res.data)
            //   console.log(decode(res.data.token))
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
              console.log(
                "SignUp Login Catch Error: ",
                err.response.data.error
              );
              alert(err.response.data.error);
            });
        })
        .catch(err => {
          console.log("SignUp Catch Error: ", err.response.data.error);
          alert(err.response.data.error);
        });
    // console.log(newUser);
    } else {
      console.log("SignUpForm.js validateInputs returned false");
    }
  };

  const isValidPassword = password => {
    if (password === "") {
      alert("You must enter a password.");
      return false;
    }
    if (!/(@|#|\$|&|\*)/.test(password)) {
      alert("You must enter a specials char ");
      return false;
    }
    if (password.length < 5 || password.length > 20) {
      alert("Password is less than 5 or greater than 20 ");
      return false;
    }
    if (!/([A-Z])/.test(password)) {
      alert("Password must contain atleast one capitalized letter");
      return false;
    }
    if (!/([0-9])/.test(password)) {
        alert("Password must contain atleast one number");
        return false;
    }
    return true;
  };

  const validateInputs = () => {
    if (newUser.email === "") {
      alert("Enter an email");
      return false;
    }
    if (newUser.cohort === "") {
      alert("Pick a Cohort ");
      return false;
    }
    console.log("validate Firing");
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
    return true;
  };

  return (
    <div>
      <h2>Sign up for an account</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" onChange={handleChange} placeholder="username" 
        value={newUser.username}
        />
        <br />
        <input
          name="password"
          value={newUser.password}
          type="password"
          onChange={handleChange}
          placeholder="password"
        />
        <br />
        <input name="name" onChange={handleChange} placeholder="name" 
        value={newUser.name}
        />
        <br />
        <input
          name="email"
          value={newUser.email}
          type="email"
          onChange={handleChange}
          placeholder="email"
        />
        <br />
        <input 
          name="cohort"
          type="text"
          value={newUser.cohort}
          onChange={handleChange}
          placeholder="cohort"
        />
        <br />
        <label>
          Helper
          <input type="checkbox" name="helper" onChange={toggleBool} />
        </label>
        <label>
          Student
          <input type="checkbox" name="student" onChange={toggleBool} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
