import React, {useState, useEffect} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { axiosWithAuth } from './utils/axiosWithAuth';
import PrivateRoute from './utils/PrivateRoute';
import StudentRoute from './utils/PrivateRoute';
import HelperRoute from './utils/HelperRoute';

import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUpForm from './components/SignUpForm';
import StudentDashboard from './components/Student/StudentDashboard.js';
import HelperDashboard from './components/Helper/HelperDashboard.js';

import { CurrentUserContext } from './contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    console.log('use effect ran')
    //if currentUser is null, load data from server if you have a token. 
    //otherwise if you don't have a token you will be unable to access private routes and will be redirected to login page if you try.
    if (!currentUser && sessionStorage.getItem('token')){
      console.log('app load user useEffect firing if !current user && token');
      axiosWithAuth().get('/users/user')
      .then(res => { console.log(res);
          setCurrentUser(res.data);
          console.log(currentUser);
      })
      .catch(err => { console.log(err.response.data.error) });
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
    <div className="App">
      <Header />
      <Route exact path='/' render={props => <LandingPage {...props} />} />
      <Route exact path='/Login' render={props => <Login {...props} />} />
      <Route exact path='/Register' render={props => <SignUpForm {...props} />} />

      {/* Switch tag from react-router-dom is necessary, code will not render without. */}
			<Switch>
        {/* <PrivateRoute exact path='/StudentDashboard' component={StudentDashboard} /> */}
        <StudentRoute exact path='/StudentDashboard' component={StudentDashboard} />
        <HelperRoute exact path='/HelperDashboard' component={HelperDashboard} />
      </Switch>
      
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;


// https://ddq.herokuapp.com/api/auth/register
// https://ddq.herokuapp.com/api/auth/login