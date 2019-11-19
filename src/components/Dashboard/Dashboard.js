import React, { useContext } from 'react'
import { Route } from 'react-router-dom';
import SidebarNav from './SidebarNav.js';

import Account from './Account.js';
import CreateTicket from './CreateTicket.js';

import OpenTicketList from './OpenTicketList.js';
import UserTicketList from './UserTicketList.js';
import ClosedTicketList from './ClosedTicketList.js';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';



export default function Dashboard() {
    const { searchTerm, setSearchTerm, filterByHelper, setFilterByHelper, 
        filterByStudent, setFilterByStudent } = useContext(CurrentUserContext);

    return (
        <div className='dashboard'>
            <SidebarNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterByHelper={filterByHelper} setFilterByHelper={setFilterByHelper} 
            filterByStudent={filterByStudent} setFilterByStudent={setFilterByStudent}/>

            <Route exact path='/Dashboard/Account' component={Account} />
            <Route exact path='/Dashboard/CreateTicket' component={CreateTicket} />

            <Route exact path='/Dashboard/Unassigned' component={OpenTicketList} />
            <Route exact path='/Dashboard/Mine' component={UserTicketList} />
            <Route exact path='/Dashboard/Closed' component={ClosedTicketList} />
        </div>
    )
}
