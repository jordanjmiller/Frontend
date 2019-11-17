// import React, { useContext } from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
// // import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

// /* 
//   PrivateRoute rules: 
//   1. It has the same API as <Route />
//   2. It renders a <Route /> and passes all the props through to it.
//   3. It checks if the user is authenticated, if they are, it renders the 'component' prop. If not, it redirects the user to '/login'
// */

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     const { currentUser } = useContext(CurrentUserContext);
//   return (
//     <Route
//       {...rest}
//       render={props => {
//         console.log('current user:', currentUser);
//         if (sessionStorage.getItem('token') && currentUser.student) {
//           return <Component {...props} />;
//         } else {
//           alert('You must be logged in to view this page.');
//           return <Redirect to='/' />; 
//         }
//       }}
//     />
//   );
// };

// export default PrivateRoute;

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
        if (sessionStorage.getItem('token') && currentUser.student) {
          return <Component {...props} />;
        } else {
          alert('You must be logged in to view this page.');
          return <Redirect to='/' />; 
        }
      }}
    />
  );
};

export default PrivateRoute;