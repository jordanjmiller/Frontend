import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function Header(props) {
    const { currentUser } = useContext(CurrentUserContext);
    console.log(currentUser);

  return (
    <>
    <div className='headerDiv'>
        <div className='initial'>
        <Link to='/'> <h1 className='initial'>DevDesk</h1> </Link>
        </div>
      
        {(()=>{ //immediately invoked function to allow javascript inside JSX. syntax: {(()=>{})()}
            if (currentUser){
                if(currentUser.helper && currentUser.student){
                    return (
                        <>
                        <h1>Welcome {currentUser.name}!</h1>
                            <nav className='loggedIn'>
                                <NavLink exact to='/'> Home</NavLink> 
                                <NavLink to='/Dashboard/Unassigned'>Helper Dashboard</NavLink>
                            </nav>
                        </>
                    );
                }
                else if(currentUser.helper && !currentUser.student){
                    return (
                        <>
                        <h1>Welcome {currentUser.name}!</h1>
                            <nav className='loggedIn'>
                                <NavLink exact to='/'> Home</NavLink> 
                                <NavLink to='/HelperDashboard'>Helper Dashboard</NavLink>
                            </nav>
                        </>
                    );
                }
                else if(!currentUser.helper && currentUser.student){
                    return (
                        <>
                        <h1>Welcome {currentUser.name}!</h1>
                            <nav className='loggedIn'>
                                <NavLink exact to='/'> Home</NavLink> 
                                <NavLink to='/'>Account</NavLink>
                                <NavLink to='/'>Create Ticket</NavLink>
                                <NavLink to='/'>Tickets</NavLink>
                            </nav>
                        </>
                    );
                }
            }
            else{
                return (
                    <>
                    <nav className='notLoggedIn'>
                        <NavLink exact to='/'>Home</NavLink>
                        <NavLink to='/Login'>Login/Sign up</NavLink>
                    </nav>
                    </>
                );
            }
        })()}
    </div>
    </>
  );
}
