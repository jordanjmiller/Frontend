import React from 'react'
import { Route } from 'react-router-dom';
import SidebarNav from './SidebarNav.js';

import Account from './Account.js';
import CreateTicket from './CreateTicket.js';

import OpenTicketList from './OpenTicketList.js';
import UserTicketList from './UserTicketList.js';
import ClosedTicketList from './ClosedTicketList.js';




export default function Dashboard() {

    return (
        <div className='dashboard'>
            <SidebarNav />
            <Route exact path='/Dashboard/Account' component={Account} />
            <Route exact path='/Dashboard/CreateTicket' component={CreateTicket} />

            <Route exact path='/Dashboard/Unassigned' component={OpenTicketList} />
            <Route exact path='/Dashboard/Mine' component={UserTicketList} />
            <Route exact path='/Dashboard/Closed' component={ClosedTicketList} />
        </div>
    )
}
