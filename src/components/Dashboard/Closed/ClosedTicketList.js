import React, {useEffect, useState, useContext} from 'react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import ClosedTicket from './ClosedTicket';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';

import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";
const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    width:100%;
`;

export default function ClosedTicketList() {
    const { searchTerm, searchType} = useContext(CurrentUserContext);

    const [closedTickets, setClosedTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axiosWithAuth().get('/tickets/resolved')
        .then(res => {
            console.log(res.data)
            setClosedTickets(res.data)
            setLoading(false);
        })
        .catch(err => {console.log('CATCH ERROR: ', err.response.data.message)
        setLoading(false);
        alert(err.response.data.message)});
    }, []);

    return (
         <div className='helperDashboard'> {/* some styling is set in app.js to render dashboard correctly */}
         <h2>Closed tickets</h2>
        <StyledLoader active={loading} spinner text='Loading...'>
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
                    })}
                </tbody>
            </table> 
      </StyledLoader>   
        </div>
    )
}