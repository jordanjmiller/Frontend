import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as timeago from 'timeago.js';

import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";
const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    width:100%;
`;

export default function ViewTicket(props) {
  const { currentUser } = useContext(CurrentUserContext)
  const [loading, setLoading] = useState('');
  const [ticket, setTicket] = useState('')
  const [helperAnswer, setHelperAnswer] = useState('');
  const ticketID = props.match.params.id;
  
  console.log('currentUser: ', currentUser);
  console.log(ticket);

  useEffect(() => {
    setLoading(true);
    axiosWithAuth()
      .get(`/tickets/${ticketID}`)
      .then(res => {
        console.log('getTicket res:', res.data);
        setLoading(false);
        setTicket(res.data.ticket_details);
      })
      .catch(err => {
        console.log("CATCH ERROR: ", err.response.data.message);
        setLoading(false);
        alert(err.response.data.message);
      });
  }, []);

  const handleInput = (e) => {
    setHelperAnswer(e.target.value);
    console.log(helperAnswer);
  }

  const answerTicket = () => {
    console.log('answerTicket() firing. answer: ')
    
  }

  const resolveTicket = () => {
    console.log('ResolveTicket() ticket.solution: ', ticket.solution)
    if (ticket.solution !== ''){

    }
  };

  return (

    <StyledLoader active={loading} spinner text='Loading...'>
    <section className="ticketContainer">
      {(()=>{
        if (ticket){
          return (
          <>
            <div className='ticketNav'>
              <div className='ticketNavLeft'>
                <div><h2>TICKET #{ticketID}</h2></div>      
              </div> 
              <nav className='ticketNavRight'>

{/* Code below only displays if user is a helper */}
                {currentUser.helper && 
                <>
                {/* Claim renders if ticket is unassigned, unclaim if assigned */}
                    {ticket.status === 'unassigned' && 
                    <>
                    <NavLink className='navLinkInternal' to='#'>Claim</NavLink>  
                    </>}
             
                    {ticket.status === 'assigned' && 
                    <>
                    <NavLink className='navLinkInternal' to='#'>Unclaim</NavLink>  
                    </>}
                  
                </>
                }
                <NavLink className='navLinkInternal' to='#'>Delete</NavLink>
                {/* Code below only displays if ticket is open */}
                {ticket.status === 'open' && 
                  <button className='button' onClick={resolveTicket}>Mark closed</button>
                }
              </nav>
            </div>

{/* Status div */}
            <div className='statusDiv'>
              
              <div>Category: {ticket.category.toUpperCase()}</div>
              <div>Subject: {ticket.title.toUpperCase()}</div>
              <p>Current status: {ticket.status.toUpperCase()}</p> 
                
            </div> 
          
          {/* Top div */}

            {/* {ticket.status === 'open' && 
              <div className='topDiv'>
                <p>{ticket.student_name} created a new help request.</p>
                <p>{timeago.format(ticket.created_at)}</p>
                <br /><br /><br />
              </div> 
            } */}

            {ticket.status === 'assigned' && 
              <>
              {ticket.solution && 
              <div className='topDiv'>
              {/* <p>Status: {ticket.status} : </p>  */}
              <p> {ticket.helper_name} has answered your question.</p>
              {/* timeago here, answered at time variable does not exists*/}
              </div> }
              {!ticket.solution && 
              <div className='topDiv'>
              <p> {ticket.helper_name} has accepted your question and will be in touch shortly.</p>
              {/* timeago here, assigned at time variable does not exists*/}
              </div> }
              </>
            }

            {ticket.status === 'resolved' && 
              <div className='topDiv'>
              {/* <p>Status: {ticket.status}</p> */}
              </div> 
              // remove mark closed button if closed
            }

{/* End Top div */}
            
{/* Start student question div  */}

            <div className='studentDiv'>
              <p>Student {ticket.student_name} asked:</p>
              <p>{timeago.format(ticket.created_at)}</p>
              <p>{ticket.description}</p>
            </div>
            {/* IF PHOTOS/VIDEOS STICK THEM HERE AT BOTTOM OF INSIDE STUDENT DIV
            OR MAKE ANOTHER DIV POP UP IF THE VALUES ARE NOT NULL FOR PHOTO/VIDEO */}

{/* End student question div  */}
{/* Start helper response div  */}

            {ticket.status !== 'open' &&
              <>
              {ticket.solution && 
              <div className='helperDiv'>
              <p>Helper {ticket.helper_name} replied:</p>
              <p>{timeago.format(ticket.resolved_at)}</p>
              <p>{ticket.solution}</p>
              </div>}

{/* Answer box displays only if user is a helper */}

              {currentUser.helper && 
              <div className='answerContainer'>
                  <div className='answerBox'>
                  <label> Write answer here
                  <input type='text' onChange={handleInput} />
                  </label>
                  </div>
                  <button onClick={answerTicket}>Submit Answer</button>
              </div>}

              </>
            }
            {/* IF PHOTOS/VIDEOS STICK THEM HERE AT BOTTOM OF INSIDE HELPER DIV
            OR MAKE ANOTHER DIV POP UP IF THE VALUES ARE NOT NULL FOR PHOTO/VIDEO */}
          </>
          );}})()}
          
          
    </section>  
    </StyledLoader>
  );
  
}



// {(()=>{
//   if (true){

//   }
// })()}


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