import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

export default function SidebarNav() {
    const { searchTerm, setSearchTerm, filterByHelper, setFilterByHelper, 
    filterByStudent, setFilterByStudent, filterByOpenClosed, setFilterByOpenClosed } = useContext(CurrentUserContext);

    let fullWindowLocation = window.location.toString();
    let noBaseWindowLocation = fullWindowLocation.slice(21, fullWindowLocation.length);
    // console.log('sidebar props', fullWindowLocation);
    // console.log('sidebar props', noBaseWindowLocation);

    const handleChange = e => {
          setSearchTerm(e.target.value);
        console.log('SideBar Search Term:', searchTerm);
      };
    
      const toggleBool = e => {
        if (e.target.name === "helper") {
            setFilterByHelper(!filterByHelper);
        } 
        else if (e.target.name === "student") {
            setFilterByStudent(!filterByStudent);
        }
        else if (e.target.name === "openClosed") {
            setFilterByOpenClosed(!filterByOpenClosed);
        }
      };

      const clearSearchTerm = () => {
          setSearchTerm('');
      };


    return (
        <div className='sidebarDiv'>
            <nav className='sidebarNav'>
                <NavLink style={{ textDecoration: 'none' }} to='/Dashboard/Unassigned'>Unassigned</NavLink> 
                <NavLink style={{ textDecoration: 'none' }} to='/Dashboard/Mine'>Mine</NavLink>
                <NavLink style={{ textDecoration: 'none' }} to='/Dashboard/Closed'>Closed</NavLink>
            </nav>

            {/* only if at any of the three above routes display filter tools. */}
            {(()=>{ //immediately invoked function to allow javascript inside JSX. syntax: {(()=>{})()}

                if(noBaseWindowLocation === '/Dashboard/Unassigned' | noBaseWindowLocation === '/Dashboard/Mine' | noBaseWindowLocation === '/Dashboard/Closed')
                {
                    return (
                        <div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <label> Search by Category                  
                            <input name="searchTerm" type="text" onChange={handleChange} value={searchTerm} placeholder="Category..." />
                            </label>
                            <br />
                            <button onClick={clearSearchTerm}>Clear</button>
                            <br />
                            {/* remove helper checkbox if currentuser is not a helper */}
                            <label> Helper
                            <input name="helper" type="checkbox" checked={filterByHelper} onChange={toggleBool} />
                            </label>
                            <label> Student
                            <input name="student" type="checkbox" checked={filterByStudent} onChange={toggleBool} />
                            </label>
                            <label> Open/Closed
                            <input name="openClosed" type="checkbox" checked={filterByOpenClosed} onChange={toggleBool} />
                            </label>
                        </div>
                    );
                }
            })()}
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