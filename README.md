Server deployed at: https://ddq.herokuapp.com/api
App deployed at: lambdadevdesk.now.sh

Dependencies used:

jwt-decode

axios

react-router-dom

styled-components

react-loading-overlay

<!-- redux
react-redux
redux-thunk

@testing-library/react -->


Temporary Documentation:

Login.js:

Enter username and password. onSubmit, axios.get server's /api/auth/login endpoint. If username/password match a user on the server, a token containing the user object is returned and saved into sessionStorage, and then the user is redirected to their dashboard (helper > student). Link to SignUpForm at the bottom of login form.

SignUpForm.js

Form to create a new user. On Submit, new user object is sent to server. If username has not already been taken, it returns a success message (else error) and the form calls the login endpoint using the new user's username and password. Once that succeeds the user is redirected to their dashboard.

Required inputs:

username, password, helper (t/f checkbox), student (t/f checkbox)

Optional inputs:

email, cohort


PrivateRoute:

Allows access or redirects based off currentUser and token status. Routes:

if token exists:

    if path = /StudentDashboard

        if currentUser.student render component

        else return 'Must be student!' and redirect home

    else if path = /HelperDashboard

        if currentUser.helper render component

        else return 'Must be helper!!' and redirect home

    if path = /Login

        return 'Already logged in!' and redirect to LogOff


else (token does not exist): return 'Must be logged in!' alert and redirect to login page. 