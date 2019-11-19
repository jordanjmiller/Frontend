import React, {useEffect, useState} from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import HelpListItem from './HelpListItem';

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
            {/* <table>
                <thead>
                    <tr>Title</tr>
                    <tr>Description</tr>
                    <tr>Category</tr>
                    <tr>Time Created</tr>
                </thead>
                <tr> */}
                <div>
                {helpRequests.map(request => {
                     return (

                        <HelpListItem 
                        key={request.id}
                        category={request.category}
                        title={request.title}
                        description={request.description}
                        time_created={request.time_created}
                        />
                        )
                    })}
                    </div>
                {/* </tr>
            </table> */}
        </div>
    )
}
