import React from "react";
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';


export default function MyTicket(props) { 
    //display teacher and student on mine list

    let curUser = '';
    let secondUser = 'FIX ME Myticket.js';
    console.log(props)
    if (props.status === 'open'){
        curUser = props.currentUser.name;
    }
    else if (props.data === 'assigned')
    {
        if (props.currentUser === props.student_name){
            curUser = props.student_name;
        }
        if (props.currentUser === props.student_name){
            curUser = props.student_name;
        }
    }
    else if (props.data === 'resolved')
    {
        if (props.currentUser === props.student_name){
            curUser = props.student_name;
        }
        if (props.currentUser === props.student_name){
            curUser = props.student_name;
        }
    }


    return (
        <>
            <td className='boldrows'>{props.status}</td>
            <td className='boldrows'>{secondUser}</td>
            <td className='boldrows'>{props.category}</td>
            <td>{props.title}</td>
            <td>{timeago.format(props.created_at)}</td>
            <td><Link to={`/Dashboard/Tickets/${props.id}`}>View</Link></td>
        </>
    
    )
}

