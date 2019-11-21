import React from "react";
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';


export default function OpenTicket(props) {
    return (
        <>
            <td className='boldrows'>{props.student_name}</td> 
            <td className='boldrows'>{props.category}</td>
            <td>{props.title}</td>
            <td>{props.description}</td>
            <td>{timeago.format(props.created_at)}</td>
            <td><Link to={`/Dashboard/Tickets/${props.id}`}>View</Link></td>
            
        </>
    
    )
}

