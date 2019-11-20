import React, {useEffect, useState, useContext} from 'react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import ClosedTicket from './ClosedTicket';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';

export default function ClosedTicketList() {
    const { searchTerm, filterByHelper, filterByStudent, filterByOpenClosed } = useContext(CurrentUserContext);

    const [closedTickets, setClosedTickets] = useState([]);

    useEffect(() => {
        axiosWithAuth().get('/tickets/resolved')
        .then(res => {
            // console.log(res.data)
            setClosedTickets(res.data)
        })
        .catch(err => {console.log('CATCH ERROR: ', err.response.data.message)
        alert(err.response.data.message)});
    }, []);

    // console.log(helpRequests);
    return (
         <div className='helperDashboard'> {/* some styling is set in app.js to render dashboard correctly */}
         <h2>Closed tickets</h2>
            <table className='tickettable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Subject</th>
                        <th>Age</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {closedTickets.map(request => {
                        return (
                            <tr key={request.id}>
                                <ClosedTicket
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
