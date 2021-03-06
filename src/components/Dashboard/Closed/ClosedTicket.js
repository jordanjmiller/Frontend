import React from "react";
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faUserCircle, faCamera, faImages, faFileVideo} from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';

const Fa = styled(FontAwesomeIcon)`
    width: 70px !important;
    height: 70px;
`
const Names = styled.div `
    width: 100%;
`

export default function ClosedTicket(props) {
    return (
        <>
            {/* <td className='boldrows'>{props.student_name}</td>  */}
            <td><div>{props.student_image ? <img className="photo" src={props.student_image} alt='Student image'/> : (
                <Fa icon={faUserCircle}/>
            )}{props.helper_name && props.helper_image ? <img className="photo2" src={props.helper_image} alt='Student image'/> : <Fa icon={faUserCircle}/>}</div><Names>{props.student_name}{props.helper_name}</Names></td>
            <td className='boldrows'>{props.category}</td>
            <td>{props.title}</td>
            {/* <td>{props.description}</td> */}
            <td>{timeago.format(props.created_at)}</td>
            <td><Link to={`/Dashboard/Tickets/${props.id}`}>View</Link></td>
            
        </>
    
    )
}

