import React, {useEffect, useState, useContext} from 'react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import MyTicket from './MyTicket';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';

export default function UserTicketList() {
    const { currentUser, searchTerm, filterByHelper, filterByStudent, filterByOpenClosed } = useContext(CurrentUserContext);

    const [userOpenTickets, setUserOpenTickets] = useState([]);
    const [userClosedTickets, setUserClosedTickets] = useState([]);

    useEffect(() => {
        axiosWithAuth().get('/tickets/open')
        .then(res => {
            // console.log(res.data)
            setUserOpenTickets(res.data)
        })
        .catch(err => {console.log('CATCH ERROR: ', err.response.data.message)
        alert(err.response.data.message)});
        axiosWithAuth().get('/tickets/resolved')
        .then(res => { 
            // console.log(res.data)
            setUserClosedTickets(res.data)
        })
        .catch(err => {console.log('CATCH ERROR: ', err.response.data.message)
        alert(err.response.data.message)});
    }, []);

    // console.log(helpRequests);
    return (
        
         <div className='helperDashboard'> {/* some styling is set in app.js to render dashboard correctly */}
         <h2>My tickets</h2>
            <table className='tickettable'>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Subject</th>
                        <th>Age</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {userOpenTickets.map(request => {
                        return (
                            <tr key={request.id}>
                                <MyTicket
                                id={request.id}
                                status={request.status}
                                category={request.category}
                                title={request.title}
                                description={request.description}
                                created_at={request.created_at}
                                />
                            </tr>
                            )
                        })}
                        {userClosedTickets.map(req => {
                        return (
                            <tr key={req.id}>
                                <MyTicket
                                id={req.id}
                                status={req.status}
                                category={req.category}
                                title={req.title}
                                description={req.description}
                                created_at={req.created_at}
                                />
                            </tr>
                            )
                        })}
                </tbody>
            </table> 
        </div>
    )
}


  {/* helper 
                
                open
                closed
                both open and closed
                
                */}

                {/* student 
                
                open
                closed
                both
                
                */}

                {/* both helper and student
                
                open
                closed
                both open and closed
                
                */}