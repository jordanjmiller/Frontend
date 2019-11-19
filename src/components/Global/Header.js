import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
<<<<<<< HEAD:src/components/Global/Header.js
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
=======
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import logo from '../images/logo.png';
>>>>>>> f97717f8b1fcdfa8181e4e62d17098b0940ac882:src/components/Header.js


export default function Header() {
    const { currentUser } = useContext(CurrentUserContext);
    // console.log(currentUser);

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



//old code if needed

// import React, { useContext } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';


// export default function Header(props) {
//     const { currentUser } = useContext(CurrentUserContext);
//     console.log(currentUser);

//   return (
//     <>
//     <div className='headerDiv'>
//         <div className='initial'>
//         <Link to='/'> <h1 className='initial'>DevDesk</h1> </Link>
//         </div>
      
//         {(()=>{ //immediately invoked function to allow javascript inside JSX. syntax: {(()=>{})()}
//             if (currentUser){
//                 if(currentUser.helper && currentUser.student){
//                     return (
//                         <>
//                         <h1>Welcome {currentUser.name}!</h1>
//                             <nav className='loggedIn'>
//                                 <NavLink exact to='/'> Home</NavLink> 
//                                 <NavLink to='/Dashboard/Unassigned'>Helper Dashboard</NavLink>
//                             </nav>
//                         </>
//                     );
//                 }
//                 else if(currentUser.helper && !currentUser.student){
//                     return (
//                         <>
//                         <h1>Welcome {currentUser.name}!</h1>
//                             <nav className='loggedIn'>
//                                 <NavLink exact to='/'> Home</NavLink> 
//                                 <NavLink to='/HelperDashboard'>Helper Dashboard</NavLink>
//                             </nav>
//                         </>
//                     );
//                 }
//                 else if(!currentUser.helper && currentUser.student){
//                     return (
//                         <>
//                         <h1>Welcome {currentUser.name}!</h1>
//                             <nav className='loggedIn'>
//                                 <NavLink exact to='/'> Home</NavLink> 
//                                 <NavLink to='/'>Account</NavLink>
//                                 <NavLink to='/'>Create Ticket</NavLink>
//                                 <NavLink to='/'>Tickets</NavLink>
//                             </nav>
//                         </>
//                     );
//                 }
//             }
//             else{
//                 return (
//                     <>
//                     <nav className='notLoggedIn'>
//                         <NavLink exact to='/'>Home</NavLink>
//                         <NavLink to='/Login'>Login/Sign up</NavLink>
//                     </nav>
//                     </>
//                 );
//             }
//         })()}
//     </div>
//     </>
//   );
// }
