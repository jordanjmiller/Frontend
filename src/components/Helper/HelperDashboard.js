import React, {useEffect, useState} from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import HelpListItem from './HelpListItem';
import './Dashboard.css';


export default function HelperDashboard() {

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
        <div>
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
                            <HelpListItem 
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
