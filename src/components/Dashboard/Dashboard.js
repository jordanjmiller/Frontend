import React from 'react'
import { Route } from 'react-router-dom';
import SidebarNav from './SidebarNav.js';
import OpenTicketList from './OpenTicketList.js';
import UserTicketList from './UserTicketList.js';
import ClosedTicketList from './ClosedTicketList.js';




export default function Dashboard() {

    return (
        <div className='dashboard'>
            <SidebarNav />
            <Route path='/Dashboard/Unassigned' component={OpenTicketList} />
            <Route path='/Dashboard/Mine' component={UserTicketList} />
            <Route path='/Dashboard/Closed' component={ClosedTicketList} />
        </div>
    )
}
