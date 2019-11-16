import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import PrivateRoute from './utils/PrivateRoute';
import SignUpForm from './components/SignUpForm';

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path='/' render={props => <LandingPage {...props} />} />
      <Route exact path='/Login' render={props => <Login {...props} />} />
      <Route exact path='/Register' render={props => <SignUpForm {...props} />} />
      {/* <PrivateRoute></PrivateRoute> */}
    </div>
  );
}

export default App;


// https://ddq.herokuapp.com/api/auth/register
// https://ddq.herokuapp.com/api/auth/login