import React from 'react'
import { NavLink } from 'react-router-dom';

// import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function SidebarNav() {
    // const { currentUser } = useContext(CurrentUserContext);



    return (
        <div className='sidebarDiv'>
            <nav className='sidebarNav'>
                <NavLink to='/Unassigned'>Unassigned</NavLink> 
                <NavLink to='/Mine'>Mine</NavLink>
                <NavLink to='/Closed'>Closed</NavLink>
            </nav>
        </div>
    )
}




//conditional rendering if needed for some reason but i dont think it is
// {(()=>{ //immediately invoked function to allow javascript inside JSX. syntax: {(()=>{})()}
// if (currentUser){
//     if(currentUser.helper){
//         return (
//             <>
//             <nav className='sidebarNav'>
//                 <NavLink exact to='/'>Unassigned</NavLink> 
//                 <NavLink to='/HelperDashboard'>Mine</NavLink>
//                 <NavLink to='/StudentDashboard'>Closed</NavLink>
//             </nav>
//             </>
//         );
//     }
//     else if(currentUser.student && !currentUser.helper){
//         return (
//             <>
//             <nav className='sidebarNav'>
//                 <NavLink exact to='/'> Home</NavLink> 
//                 <NavLink to='/HelperDashboard'>Helper Dashboard</NavLink>
//             </nav>
//             </>
//         );
//     }
// }
// else{
//     return (
//         <h1>SideBarNav.js ELSE. How did you get here? Report bug please!</h1>
//     );
// }
// })()}