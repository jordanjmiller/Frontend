import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useContext(CurrentUserContext);

  return (
    <Route
      {...rest}
      render={props => {
        // console.log('current user:', currentUser);
        if (sessionStorage.getItem('token') && currentUser) {
          // console.log('PrivateRoute: token == true');
          if (rest.path === '/StudentDashboard')
          {
            // console.log('PrivateRoute: path: /StudentDashboard');
            if(currentUser.student)
            {
              // console.log('PrivateRoute: currentUser.student == true');
              return <Component {...props} />;
            }
            else
            {
              // console.log('PrivateRoute: currentUser.student == false');
              alert('You must be a student to view this page.');
              return <Redirect to='/' />; 
            }
          }
          else if (rest.path === '/HelperDashboard')
          {
            // console.log('PrivateRoute: path: /HelperDashboard');
            if(currentUser.helper)
            {
              // console.log('PrivateRoute: currentUser.helper == true');
              return <Component {...props} />;
            }
            else
            {
              // console.log('PrivateRoute: currentUser.helper == false');
              alert('You must be a helper to view this page.');
              return <Redirect to='/' />; 
            }
          }
        }//if token exists closer
        else {
          // console.log('PrivateRoute: token == false');
          alert('You must be logged in to view this page.');
          return <Redirect to='/Login' />;
        }
      }}
    />
  );
};

export default PrivateRoute;