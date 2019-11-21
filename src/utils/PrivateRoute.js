import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Route
      {...rest}
      render={props => {
        if (sessionStorage.getItem('token') && currentUser) {
          //render component if user is logged in and has a token
          return <Component {...props} />;
        }
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