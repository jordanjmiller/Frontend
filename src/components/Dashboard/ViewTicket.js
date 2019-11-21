import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


export default function ViewTicket(props) {
  const { currentUser } = useContext(CurrentUserContext)
  const [ticket, setTicket] = useState([{}]);
  const ticketID = props.match.params.id;

  useEffect(() => {
    axiosWithAuth()
      .get(`/tickets/${ticketID}`)
      .then(res => {
        console.log('getTicket res:', res.data);
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

  const answerTicket = () => {
    
  }

  const resolveTicket = () => {
    console.log('ResolveTicket() ticket.solution: ', ticket.solution)
    if (ticket.solution !== ''){

    }
  };

  return (
    <section className="ticketContainer">
      {(()=>{
        if (ticket){
          return (
          <>
            <div className='ticketNav'>
              <div className='ticketNavLeft'>
                <div >
                  <h2>Ticket #{ticketID}</h2>
                  <p>{ticket.title}</p>
                </div>
                <p>{ticket.category}</p>
              </div>
              <nav className='ticketNavRight'>

{/* Code below only displays if user is a helper */}
                {currentUser.helper && 
                <>
                {/* Claim renders if ticket is unassigned, unclaim if assigned */}
                    {ticket.status === 'unassigned' && 
                    <>
                    <p>Claim</p>  
                    </>}
             
                    {ticket.status === 'assigned' && 
                    <>
                    <p>Unclaim</p>  
                    </>}
                  
                </>
                }
                

                <p>Delete</p>
                {/* Code below only displays if ticket is open */}
                {ticket.status === 'open' && 
                  <button className='closeTicket' onClick={resolveTicket}>Mark closed</button>
                }
              </nav>
            </div>

            {ticket.status === 'open' && 
              <div className='topDiv'>
                <p>Status: {ticket.status} : {ticket.student_name} created a new help request.</p>
                {/* insert timeago */}
              </div> 
            }
            {ticket.status === 'assigned' && 
              <>
              {ticket.solution && 
              <div className='topDiv'>
              <p>Status: {ticket.status} : {ticket.helper_name} has answered your question.</p>
              {/* timeago here, answered at time variable does not exists*/}
              </div> }
              {!ticket.solution && 
              <div className='topDiv'>
              <p>Status: {ticket.status} : {ticket.helper_name} has accepted your question and will be in touch shortly.</p>
              {/* timeago here, assigned at time variable does not exists*/}
              </div> }
              </>
            }
            {ticket.status === 'resolved' && 
              <div className='topDiv'>
              <p>Status: {ticket.status}</p>
              </div> 
              // remove mark closed button if closed
            }
            <div className='studentDiv'>
              <p>Student {ticket.student_name} asked:</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            {/* IF PHOTOS/VIDEOS STICK THEM HERE AT BOTTOM OF INSIDE STUDENT DIV
            OR MAKE ANOTHER DIV POP UP IF THE VALUES ARE NOT NULL FOR PHOTO/VIDEO */}
            {ticket.status !== 'open' &&
              <>
              {ticket.solution && 
              <div className='helperDiv'>
              <p>Helper {ticket.helper_name} replied:</p>
              <br />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>}

{/* Answer box displays only if user is a helper */}
              {currentUser.helper && 
              <div className='answerContainer'>
                  <div className='answerBox'>
                  <label> Write answer here
                  <input type='text'/>
                  </label>
                  </div>
                  <button>Submit</button>
              </div>}

              </>
            }
            {/* IF PHOTOS/VIDEOS STICK THEM HERE AT BOTTOM OF INSIDE HELPER DIV
            OR MAKE ANOTHER DIV POP UP IF THE VALUES ARE NOT NULL FOR PHOTO/VIDEO */}
          </>
          );}})()}
          
          
    </section>  
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