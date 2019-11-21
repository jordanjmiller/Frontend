import React, {useEffect, useState, useContext} from 'react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import ClosedTicket from './ClosedTicket';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';

export default function ClosedTicketList() {
    const { searchTerm, searchType } = useContext(CurrentUserContext);

    const [closedTickets, setClosedTickets] = useState([]);

    useEffect(() => {
        axiosWithAuth().get('/tickets/resolved')
        .then(res => {
            console.log(res.data)
            setClosedTickets(res.data)
        })
        .catch(err => {console.log('CATCH ERROR: ', err.response.data.message)
        alert(err.response.data.message)});
    }, []);

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
                <tbody>{closedTickets && closedTickets.map(ticket => {
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
                            <tr key={ticket.id}><ClosedTicket id={ticket.id} student_name={ticket.student_name} category={ticket.category} 
                            title={ticket.title} description={ticket.description} created_at={ticket.created_at} /></tr> )
                    }
                    else{return null}
                    })}
                </tbody>
            </table> 
        </div>
    )
}