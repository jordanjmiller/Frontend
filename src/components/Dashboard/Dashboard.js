import React, { useContext } from 'react'
import { Route } from 'react-router-dom';
import SidebarNav from './SidebarNav.js';

import Account from './Account.js';
import CreateTicket from './CreateTicket.js';

import OpenTicketList from './OpenTicketList.js';
import UserTicketList from './UserTicketList.js';
import ClosedTicketList from './ClosedTicketList.js';
import Ticket from './Ticket';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';



export default function Dashboard() {
    const { searchTerm, setSearchTerm, filterByHelper, setFilterByHelper, 
        filterByStudent, setFilterByStudent, filterByOpenClosed, setFilterByOpenClosed } = useContext(CurrentUserContext);

    return (
        <div className='dashboard'>
            <CurrentUserContext.Provider value={{ searchTerm, setSearchTerm, filterByHelper, setFilterByHelper, 
            filterByStudent, setFilterByStudent, filterByOpenClosed, setFilterByOpenClosed }}>
                <SidebarNav />

                <Route exact path='/Dashboard/Account' component={Account} />
                <Route exact path='/Dashboard/CreateTicket' component={CreateTicket} />

                <Route exact path='/Dashboard/Unassigned' component={OpenTicketList} />
                <Route exact path='/Dashboard/Mine' component={UserTicketList} />
                <Route exact path='/Dashboard/Closed' component={ClosedTicketList} />
                <Route exact path='/Dashboard/Tickets/:id' component={Ticket} />
            </CurrentUserContext.Provider>
        </div>
    )
}
