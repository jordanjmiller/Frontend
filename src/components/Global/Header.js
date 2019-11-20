import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


export default function Header() {
    const { currentUser } = useContext(CurrentUserContext);
    // console.log(currentUser);

  return (
    <>
    <div className='headerDiv'>
        <div className='initial'>
        <Link to='/'> <h1 className='initial'>DevDesk</h1> </Link>
        </div>
      
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
                        <NavLink className='navLink' exact to='/'>Home</NavLink>
                        <NavLink className='navLink' to='/Login'>Login/Sign up</NavLink>
                    </nav>
                    </>
                );
            }
        })()}
    </div>
    </>
  );
}

