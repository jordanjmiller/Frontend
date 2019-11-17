import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
// import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

/* 
  PrivateRoute rules: 
  1. It has the same API as <Route />
  2. It renders a <Route /> and passes all the props through to it.
  3. It checks if the user is authenticated, if they are, it renders the 'component' prop. If not, it redirects the user to '/login'
*/

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useContext(CurrentUserContext);

  return (
    <Route
      {...rest}
      render={props => {
        console.log('current user:', currentUser);
        if (sessionStorage.getItem('token')) {
          console.log('PrivateRoute: token == true');
          if (rest.path === '/StudentDashboard')
          {
            console.log('PrivateRoute: path: /StudentDashboard');
            if(currentUser.student)
            {
              console.log('PrivateRoute: currentUser.student == true');
              return <Component {...props} />;
            }
            else
            {
              console.log('PrivateRoute: currentUser.student == false');
              return <Redirect to='/' />; 
            }
          }
          else if (rest.path === '/HelperDashboard')
          {
            console.log('PrivateRoute: path: /HelperDashboard');
            if(currentUser.helper)
            {
              console.log('PrivateRoute: currentUser.helper == true');
              return <Component {...props} />;
            }
            else
            {
              console.log('PrivateRoute: currentUser.helper == false');
              return <Redirect to='/' />; 
            }
          }
          else if (rest.path === '/Logon')
          {
            console.log('PrivateRoute: path: /Logon. Redirecting to LogOut.');
              return <Redirect to='/LogOut' />; 
          }
        } 
        else {
          console.log('PrivateRoute: token == false');
          alert('You must be logged in to view this page.');
          return <Redirect to='/Login' />; 
        }
      }}
    />
  );
};

export default PrivateRoute;