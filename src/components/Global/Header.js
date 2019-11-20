import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Header(props) {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    // console.log('Header Current User', currentUser);

    const logout = () => {
        sessionStorage.removeItem('token');
        setCurrentUser('');
        alert('Logged out successfully. Come back soon!');
        props.history.push('/');
    }

  return (
    <>
    <header>
        
        <Link to='/'><img className="logo" src={logo} /></Link>
      
        {(()=>{ //immediately invoked function to allow javascript inside JSX. syntax: {(()=>{})()}
            if (currentUser){
                return (
                    <>
                    <h4>Welcome {currentUser.name}!</h4>
                        <nav className='loggedIn'>
                            {/* <NavLink className='navLink' exact to='/'> Home</NavLink> WS: Removed because the logo brings them home  */}
                            <NavLink className='navLink' to='/Dashboard/Account'>Account</NavLink>
                            <NavLink className='navLink' to='/Dashboard/CreateTicket'>Create Ticket</NavLink>
                            <NavLink className='navLink' to='/Dashboard/Unassigned'>Dashboard</NavLink>
                            <button onClick={logout}>Sign out</button>
                            {/* Not sure what below is intended to link to */}
                            {/* <NavLink to='/'>Tickets</NavLink> */}
                        </nav>
                    </>
                );
            }
            else{
                return (
                    <>
                    <nav className='notLoggedIn'>
                        <NavLink className='navLink' exact to='/Login'>Login</NavLink>
                        <NavLink className='button' to='/Register'>Register</NavLink>
                    </nav>
                    </>
                );
            }
        })()}
    </header>
    </>
  );
}

