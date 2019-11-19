import React, {useEffect, useState, useContext} from 'react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import ClosedTicket from './ClosedTicket';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';

export default function ClosedTicketList() {
    const { searchTerm, filterByHelper, filterByStudent, filterByOpenClosed } = useContext(CurrentUserContext);

    const [closedTickets, setClosedTickets] = useState([]);

    useEffect(() => {
        axiosWithAuth().get('/tickets/open') // this is just displaying open tickets right now, next to change to new closed ticket API endpoint after I get clarification on how to use it
        .then(res => {
            // console.log(res.data)
            setClosedTickets(res.data)
        });
        // add error catch 
    }, []);

    // console.log(helpRequests);
    return (
         <div className='helperDashboard'> {/* some styling is set in app.js to render dashboard correctly */}
            <table className='tickettable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        {/* <th>Status</th> */}
                        <th>Description</th>
                        <th>Subject</th>
                        <th>Age</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {closedTickets.map(request => {
                        return (
                            <tr>
                            <ClosedTicket
                            key={request.id}
                            id={request.id}
                            student_name={request.student_name}
                            category={request.category}
                            title={request.title}
                            description={request.description}
                            created_at={request.created_at}
                            />
                            </tr>
                            )
                        })}
                </tbody>
            </table> 
        </div>
    )
}
