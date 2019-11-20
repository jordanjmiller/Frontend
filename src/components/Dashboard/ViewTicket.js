import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Ticket from "./Ticket";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


export default function ViewTicket(props) {
  const { currentUser } = useContext(CurrentUserContext)
  const [ticketFromServer, setTicketFromServer] = useState([{}]);

  useEffect(() => {
    const ticketID = props.match.params.id;
    axiosWithAuth()
      .get(`/tickets/${ticketID}`)
      .then(res => {
        console.log('get ticket response: ', res.data);
        setTicketFromServer(res.data);
      })
      .catch(err => {
        console.log("CATCH ERROR: ", err.response.data.message);
        alert(err.response.data.message);
      });
    // add error catch
  }, []);
console.log('currentUser: ', currentUser);
console.log(ticketFromServer)
console.log(ticketFromServer[0].student_name)
  if( currentUser.name === ticketFromServer.student_name){
    // console.log(ticketFromServer[0].student_name)
  }
  else if( currentUser.name === ticketFromServer.student_name){
    // console.log(ticketFromServer[0].student_name)
  }

  // useEffect(() => {
  //   const ticketID = props.match.params.id;
  //   axiosWithAuth()
  //     .get(`/tickets/${ticketID}`)
  //     .then(res => {
  //       console.log(res.data);

  //       setTickets(
  //         res.data.find(ticket => {
  //           return ticket.id === ticketID;
  //         })
  //       );
  //     })
  //     .catch(err => {
  //       console.log("CATCH ERROR: ", err.response.data.message);
  //       alert(err.response.data.message);
  //     });
  //   // add error catch
  // }, []);

  return (
    <div className="ticketContainer">
      <h1>Title: {ticketFromServer[0].title}</h1>
     <h2>category: {ticketFromServer[0].category}</h2>
    
   
     <div className="text-box">
     <h3> Student {ticketFromServer[0].student_name} asked 
     <p> {ticketFromServer[0].description}</p>
     </h3>
    <p> created_at {ticketFromServer[0].created_at}</p>
     </div>
    </div>  
  );
  
}

//   "id": 10,
//   "title": "Cake",
//   "category": "food",
//   "description": "If I don't have some cake soon, I might die.",
//   "created_at": "2019-11-20T14:45:12.503Z",
//   "open_video": null,
//   "resolved_video": null,
//   "student_name": "Stanley Hudson",
//   "helper_name": "Andy Bernard",
//   "status": "resolved",
//   "resolved_at": "2019-11-20T14:45:12.527Z"
