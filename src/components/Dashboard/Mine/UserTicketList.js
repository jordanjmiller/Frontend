import React, {useEffect, useState, useContext} from 'react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import MyTicket from './MyTicket';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';

export default function UserTicketList() {
    const { searchTerm, filterByHelper, filterByStudent, filterByOpenClosed } = useContext(CurrentUserContext);

    const [userTickets, setUserTickets] = useState([]);

    useEffect(() => {
        axiosWithAuth().get('/tickets/open') 
        // this is just displaying open tickets right now, next to change to something dynamic like this: axiosWithAuth().get('/tickets/open/' + {id})
        .then(res => {
            // console.log(res.data)
            setUserTickets(res.data)
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
                    {userTickets.map(request => {
                        return (
                            <tr>
                            <MyTicket
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
