import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Ticket from "./Ticket";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


export default function ViewTicket(props) {
  const { currentUser } = useContext(CurrentUserContext)
  const [ticket, setTicket] = useState([{}]);

  useEffect(() => {
    const ticketID = props.match.params.id;
    axiosWithAuth()
      .get(`/tickets/${ticketID}`)
      .then(res => {
        console.log('get ticket response: ', res.data);
        setTicket(res.data.ticket_details);
      })
      .catch(err => {
        console.log("CATCH ERROR: ", err.response.data.message);
        alert(err.response.data.message);
      });
    // add error catch
  }, []);
console.log('currentUser: ', currentUser);
console.log(ticket)
// console.log(ticket[0].student_name)
  if( currentUser.name === ticket.student_name){
    // console.log(ticketFromServer[0].student_name)
  }
  else if( currentUser.name === ticket.student_name){
    // console.log(ticketFromServer[0].student_name)
  }


  return (
    <div className="ticketContainer">

    </div>  
  );
  
}

// {
//   "ticket_details": {
//     "id": 2,
//     "title": "Where is he?",
//     "category": "lost cousin",
//     "description": "I cannot find Mose",
//     "created_at": "2019-11-20T14:45:12.503Z",
//     "open_video": null,
//     "resolved_video": null,
//     "solution": null,
//     "student_name": "Dwight Schrute",
//     "helper_name": "Creed Bratton",
//     "status": "assigned",
//     "resolved_at": null
//   },
//   "open_pictures": [],
//   "resolved_pictures": []
// }