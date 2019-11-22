import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import unclaimed from '../../images/unclaimed.png'
import mine from '../../images/mine.png'
import closed from '../../images/closed.png'

export default function SidebarNav(props) {
    const { searchType, setSearchType, searchTerm, setSearchTerm, filterByHelperStudentBoth, setFilterByHelperStudentBoth, 
        filterByOpenClosedAll, setFilterByOpenClosedAll } = useContext(CurrentUserContext);

        // console.log('SideBarNav', props.props.location.pathname);

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
            <div>
                <img src={unclaimed} alt="Unclaimed tickets" />
                <NavLink className='navLink' to='/Dashboard/Unassigned'>Unassigned</NavLink> 
            </div>
            <div>
                <img src={mine} alt="My tickets" />
                <NavLink className='navLink' to='/Dashboard/Mine'>Mine</NavLink>
            </div>
            <div>
                <img src={closed} alt="Closed tickets" />
                <NavLink className='navLink' to='/Dashboard/Resolved'>Resolved</NavLink>
            </div>
            </nav>

            {/* only if at any of the three above routes display filter tools. */}
                
            <div className='filterToolsDiv'>
                {(()=>{ //immediately invoked function to allow javascript inside JSX. syntax: {(()=>{})()}
                        if(props.props.location.pathname === '/Dashboard/Unassigned' | props.props.location.pathname === '/Dashboard/Mine' | props.props.location.pathname === '/Dashboard/Resolved')
                        {
                            return(
                                <>
                                    <p> Filter by:</p>
                                    <div className="select">
                                        {/* <label for="select-box"> */}
                                        <select id="select-box" onChange={handleSelect} name="searchBy">
                                            <option value="Category">Category</option>
                                            <option value="Student">Student Name</option>
                                            {props.props.location.pathname !== '/Dashboard/Unassigned' && <option value="Helper">Helper Name</option>}
                                            <option value="Title">Title</option>
                                            <option value="Description">Description</option>
                                            {props.props.location.pathname !== '/Dashboard/Unassigned' && <option value="Solution">Solution</option>}
                                        </select>
                                    </div>
                                    <input  className='searchBox' name="searchTerm" type="text" onChange={handleChange} value={searchTerm} placeholder="Filter" />
                                    {/* was {`${searchType}...`} */}
                                    {/* </label> */}
                                    <br />
                                    <button className="button" onClick={clearSearchTerm}>Clear</button>
                                    <br />
                                    {props.props.location.pathname === '/Dashboard/Mine' &&
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