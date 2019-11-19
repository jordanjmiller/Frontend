import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function SidebarNav() {
    const { currentUser } = useContext(CurrentUserContext);



    return (
        <div className='sidebarDiv'>
            {(()=>{ //immediately invoked function to allow javascript inside JSX. syntax: {(()=>{})()}
                if (currentUser){
                    if(currentUser.helper){
                        return (
                            <>
                            <nav className='sidebarNav'>
                                <NavLink exact to='/'> Home</NavLink> 
                                <NavLink to='/HelperDashboard'>Helper Dashboard</NavLink>
                                <NavLink to='/StudentDashboard'>Student Dashboard</NavLink>
                            </nav>
                            </>
                        );
                    }
                    else if(currentUser.student && !currentUser.helper){
                        return (
                            <>
                            <nav className='sidebarNav'>
                                <NavLink exact to='/'> Home</NavLink> 
                                <NavLink to='/HelperDashboard'>Helper Dashboard</NavLink>
                            </nav>
                            </>
                        );
                    }
                }
                else{
                    return (
                        <h1>SideBarNav.js ELSE. How did you get here? Report bug please!</h1>
                    );
                }
            })()}
        </div>
    )
}
