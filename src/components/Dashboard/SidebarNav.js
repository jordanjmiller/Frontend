import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

export default function SidebarNav() {
    const { searchType, setSearchType, searchTerm, setSearchTerm, filterByHelperStudentBoth, setFilterByHelperStudentBoth, 
        filterByOpenClosedAll, setFilterByOpenClosedAll } = useContext(CurrentUserContext);

    let fullWindowLocation = window.location.toString();
    let noBaseWindowLocation = fullWindowLocation.slice(21, fullWindowLocation.length);
    // console.log('sidebar props', fullWindowLocation);
    // console.log('sidebar props', noBaseWindowLocation);
    //MOVE TO APP and also fix for deployed url. this is a hardcoded way to get route location without props based on url length. #hacks
    //im dumb just load router prop from some component and set it to global state and pass around..


    // console.log('sidebar props', searchType);

    const handleChange = e => {
          setSearchTerm(e.target.value);
        // console.log('SideBar Search Term:', searchTerm);
      };
    
      const toggleBool = e => {
        if (filterByHelperStudentBoth === 'All') {
            setFilterByHelperStudentBoth('Student');
        }
        else if (filterByHelperStudentBoth === 'Student') {
            setFilterByHelperStudentBoth('Helper');
        }
        else if (filterByHelperStudentBoth === 'Helper') {
            setFilterByHelperStudentBoth('All');
        }
      };

      const handleSelect = e => {
        //   console.log(e.target.value);
          setSearchType(e.target.value);
      }

      const clearSearchTerm = () => {
          setSearchTerm('');
      };

      const toggleButton = (e) => {
        if (filterByOpenClosedAll === 'All') {
            setFilterByOpenClosedAll('Open');
        }
        else if (filterByOpenClosedAll === 'Open') {
            setFilterByOpenClosedAll('Closed');
        }
        else if (filterByOpenClosedAll === 'Closed') {
            setFilterByOpenClosedAll('All');
        }
      }


    return (
        <div className='sidebarDiv'>
            <nav className='sidebarNav'>
                <NavLink className='navLink' to='/Dashboard/Unassigned'>Unassigned</NavLink> 
                <NavLink className='navLink' to='/Dashboard/Mine'>Mine</NavLink>
                <NavLink className='navLink' to='/Dashboard/Resolved'>Resolved</NavLink>
            </nav>

            {/* only if at any of the three above routes display filter tools. */}
                
            <div className='filterToolsDiv'>
                {(()=>{ //immediately invoked function to allow javascript inside JSX. syntax: {(()=>{})()}
                        if(noBaseWindowLocation === '/Dashboard/Unassigned' | noBaseWindowLocation === '/Dashboard/Mine' | noBaseWindowLocation === '/Dashboard/Resolved')
                        {
                            return(
                                <>
                                <label> Search by:
                                <select onChange={handleSelect} name="searchBy">
                                    <option value="Category">Category</option>
                                    <option value="Student">Student Name</option>
                                    {noBaseWindowLocation !== 'Unassigned' && <option value="Helper">Helper Name</option>}
                                    <option value="Title">Title</option>
                                    <option value="Description">Description</option>
                                    {noBaseWindowLocation !== 'Unassigned' && <option value="Answer">Answer</option>}
                                </select>
                                <input  className='searchBox' name="searchTerm" type="text" onChange={handleChange} value={searchTerm} placeholder={`${searchType}...`} />
                                </label>
                                <br />
                                <button className="button" onClick={clearSearchTerm}>Clear</button>
                                <br />
                                {noBaseWindowLocation === '/Dashboard/Mine' &&
                                        <>
                                        <label> Helper/Student:
                                        <br />
                                        <button onClick={toggleBool}>{filterByHelperStudentBoth} Tickets</button>
                                        </label>
                                        <br />
                                        <label> Display:
                                        <br />
                                        <button onClick={toggleButton}>{filterByOpenClosedAll} Tickets</button>
                                        </label>
                                        </>
                                }
                                </>
                            );
                        }
                })()}
            </div>
        </div>  
    )
}