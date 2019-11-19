import React, {useEffect, useState} from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import OpenTicket from './OpenTicket';
import './Dashboard.css';


export default function OpenTicketList() {

    const [helpRequests, setHelpRequests] = useState([]);

    useEffect(() => {
        axiosWithAuth().get('/tickets/open')
        .then(res => {
            console.log(res.data)
            setHelpRequests(res.data)
        });
        // add error catch 
    }, []);

    console.log(helpRequests);
    return (
         <div className='helperDashboard'> {/* some styling is set in app.js to render dashboard correctly */}
            <h1>This is the Helper Dashboard</h1>
            <table className='tickettable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Subject</th>
                        <th>Age</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {helpRequests.map(request => {
                        return (
                            <tr>
                            <OpenTicket 
                            key={request.id}
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
