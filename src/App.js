import React, {useState, useEffect} from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { axiosWithAuth } from './utils/axiosWithAuth';
import PrivateRoute from './utils/PrivateRoute';
import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";

import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import LogOut from './components/LogOut';
import SignUpForm from './components/SignUpForm';
import StudentDashboard from './components/Student/StudentDashboard.js';
import HelperDashboard from './components/Helper/HelperDashboard.js';

import { CurrentUserContext } from './contexts/CurrentUserContext.js';

const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
`;

function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //if currentUser is null, load data from server if you have a token. 
    //otherwise if you don't have a token you will be unable to access private routes and will be redirected to login page if you try.
    if (!currentUser && sessionStorage.getItem('token')){
      // console.log('app load user useEffect firing if !current user && token');
      setLoading(true);
      axiosWithAuth().get('/users/user')
      .then(res => { 
          // console.log(res);
          setCurrentUser(res.data);
          // console.log(currentUser);
      })
      .catch(err => { console.log(err.response.data.error) });
    }
    else{
      setLoading(false);
    }
  }, [currentUser, loading])

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, loading, setLoading }}>
      <StyledLoader active={loading} spinner text='Loading...'>
        <div className='App'>
          <Header />
          <Route exact path='/' render={props => <LandingPage {...props} />} />
          <Route exact path='/Login' render={props => <Login {...props} />} />
          {!loading && 
          <div>
            <Route exact path='/LogOut' render={props => <LogOut {...props} />} />
            <Route exact path='/Register' render={props => <SignUpForm {...props} />} />
            <PrivateRoute exact path='/StudentDashboard' component={StudentDashboard} />
            <PrivateRoute exact path='/HelperDashboard' component={HelperDashboard} />
          </div>
          }
        </div>
      </StyledLoader>
    </CurrentUserContext.Provider>
  );
}

export default App;


// https://ddq.herokuapp.com/api/auth/register
// https://ddq.herokuapp.com/api/auth/login