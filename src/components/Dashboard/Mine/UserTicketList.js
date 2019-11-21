import React, {useEffect, useState, useContext} from 'react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import axios from 'axios';
import MyTicket from './MyTicket';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';



export default function UserTicketList() {
    const { currentUser, searchTerm, searchType, filterByHelperStudentBoth, filterByOpenClosedAll } = useContext(CurrentUserContext);

    const [allUserTickets, setAllUserTickets] = useState([]);

    useEffect(() => {
        (async () => {
            try{
                const what = [
                axiosWithAuth().get('https://ddq.herokuapp.com/api/tickets/students/student/open'),
                axiosWithAuth().get(`https://ddq.herokuapp.com/api/tickets/students/student/resolved`),
                axiosWithAuth().get('https://ddq.herokuapp.com/api/tickets/helpers/open'),
                axiosWithAuth().get(`https://ddq.herokuapp.com/api/tickets/helpers/resolved`)];
                
                const mom = await axios.all(what);
                    const hey = [];
                for(let val of mom){
                    if(Array.isArray(val.data)){
                        for(let mom of val.data){
                            hey.push(mom);
                        }
                    }
                }
                setAllUserTickets([...hey])
                console.log(hey);
            }catch(err){
                console.log('CATCH ERROR: ', err);
            }
        })()
    }, []);

    return (
         <div className='helperDashboard'> {/* some styling is set in app.js to render dashboard correctly */}
    
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
                <tbody>{allUserTickets && allUserTickets.map(ticket => {
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


                        if (filterByOpenClosedAll === 'Closed' && ticket.status !== 'resolved')
                        {
                            shouldReturn = false;
                        }
                        else if (filterByOpenClosedAll === 'Open' && ticket.status === 'resolved')
                        {
                            shouldReturn = false;
                        }

                        if (filterByHelperStudentBoth === 'Student' && ticket.student_name !== currentUser.name)
                        {
                            shouldReturn = false;
                        }
                        else if (filterByHelperStudentBoth === 'Helper' && ticket.helper_name !== currentUser.name)
                        {
                            shouldReturn = false;
                        }


                        if (shouldReturn === true){
                            return (
                                <tr key={ticket.id}><MyTicket id={ticket.id} student_name={ticket.student_name} category={ticket.category} 
                                title={ticket.title} description={ticket.description} created_at={ticket.created_at} /></tr> )
                        }
                })}
                </tbody>
            </table> 
        </div>
    )
}