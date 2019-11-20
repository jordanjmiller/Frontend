import React, {useEffect, useState, useContext} from 'react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import OpenTicket from './OpenTicket';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';

export default function OpenTicketList() {
    const { searchTerm, filterByHelper, filterByStudent, filterByOpenClosed } = useContext(CurrentUserContext);

    const [openTickets, setOpenTickets] = useState([]);

    useEffect(() => {
        axiosWithAuth().get('/tickets/open')
        
        .then(res => {
            // console.log(res.data)
            setOpenTickets(res.data)
        })
        .catch(err => {console.log('CATCH ERROR: ', err.response.data.message)
        alert(err.response.data.message)});
    }, []);

    // console.log(helpRequests);
    return (
         <div className='helperDashboard'> {/* some styling is set in app.js to render dashboard correctly */}
         <h2>Unassigned tickets</h2>
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
                
                {/* searchterm/category- no toggles */}

              
                <tbody>
                    {openTickets.map(request => {
                        return (
                            <tr key={request.id}>
                            <OpenTicket 
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
