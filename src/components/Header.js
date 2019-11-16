import React from 'react';
import { Link, NavLink } from 'react-router-dom';


export default function Header(props) {

  return (
    <>
    <div className='headerDiv'>
      <div className='initial'>
      <Link to='/'> <h1 className='initial'>DevDesk</h1> </Link>
      </div>
      
      {/* {(() => {
        if (props.loggedIn === true) {
          return (
            <>
        <h1>Welcome {}!</h1>
            <nav className='loggedIn'>
              <NavLink exact to='/'> Home</NavLink> 
              <NavLink to='/Teacher'>Teacher </NavLink>
              <NavLink to='/Student'>Student </NavLink>
            </nav>
            </>
          );
        } else if (props.loggedIn === false) {
          return (
            <nav className='notLoggedIn'>
              <NavLink exact to='/'>Home</NavLink>
              <NavLink to='/About'>About </NavLink>
              <NavLink to='/Login'>Login </NavLink>
            </nav>
          );
        }
      })()} */}

    </div>
    </>
  );
}
