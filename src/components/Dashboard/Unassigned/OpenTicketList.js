import React, {useEffect, useState, useContext} from 'react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import OpenTicket from './OpenTicket';

import { CurrentUserContext } from "../../../contexts/CurrentUserContext.js";

export default function OpenTicketList() {
    const { searchTerm, searchType } = useContext(CurrentUserContext);

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
                <tbody>
                    {openTickets && openTickets.map(ticket => {
                        let shouldReturn = false;
                        if (searchType === 'Category' && ticket.category.toLowerCase().includes(searchTerm.toLowerCase())){
                            shouldReturn = true; 
                        }
                        else if (searchType === 'Student' && ticket.student_name.toLowerCase().includes(searchTerm.toLowerCase())){
                                shouldReturn = true;
                        }
                        else if (searchType === 'Helper' && ticket.helper_name.toLowerCase().includes(searchTerm.toLowerCase())){
                            shouldReturn = true;
                        }
                        else if (searchType === 'Title' && ticket.title.toLowerCase().includes(searchTerm.toLowerCase())){
                            shouldReturn = true;
                        }
                        else if (searchType === 'Description' && ticket.description.toLowerCase().includes(searchTerm.toLowerCase())){
                            shouldReturn = true;
                        }
                        else if (searchType === 'Answer' && ticket.answer.toLowerCase().includes(searchTerm.toLowerCase())){
                            shouldReturn = true;
                        }
                        if (shouldReturn === true){
                            return (
                                <tr key={ticket.id}><OpenTicket id={ticket.id} student_name={ticket.student_name} category={ticket.category} 
                                title={ticket.title} description={ticket.description} created_at={ticket.created_at} /></tr> )
                        }
                        })}
                </tbody>
            </table> 
        </div>
    )
}
