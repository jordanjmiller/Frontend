import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as timeago from 'timeago.js';
import placeholder1 from '../../images/placeholder1.jpeg';
import placeholder2 from '../../images/placeholder2.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faUserCircle, faCamera} from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";
const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    width:100%;
`;

const Fa = styled(FontAwesomeIcon) `
  width: 65px !important;
  height: 65px;
`

const ImagesDiv = styled.div `
  display: flex;
  justify-content: spaced-evenly
`

const Image = styled.img `
  max-width: 400px;
`

export default function ViewTicket(props) {
  const { currentUser } = useContext(CurrentUserContext)
  const [loading, setLoading] = useState('');
  const [ticket, setTicket] = useState('')
  const [helperAnswer, setHelperAnswer] = useState('');
  const ticketID = props.match.params.id;
  const [openPictures, setOpenPictures] = useState([]);
  const [resolvedPictures, setResolvedPictures] = useState([]);
  const [openVideo, setOpenVideo] = useState(null);
  const [resolvedVideo, setResolvedVideo] = useState(null);
  
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
        setOpenPictures(res.data.open_pictures);
        setResolvedPictures(res.data.resolved_pictures);
        setOpenVideo(res.data.ticket_details.open_video);
        setResolvedVideo(res.data.ticket_details.resolved_video);
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

  const updateAnswer = () => {
    console.log('answerTicket() firing. answer: ')
    // setLoading(true);
    // axiosWithAuth()
    //   .get(`/tickets/${ticketID}`)
    //   .then(res => {
    //     console.log('getTicket res:', res.data);
    //     setLoading(false);
    //     setTicket(res.data.ticket_details);
    //   })
    //   .catch(err => {
    //     console.log("CATCH ERROR: ", err.response.data.message);
    //     setLoading(false);
    //     alert(err.response.data.message);
    //   });
  }

  const resolveTicket = () => {
    console.log('ResolveTicket() ticket.solution: ', ticket.solution)
    if (ticket.solution !== ''){
        setLoading(true);
        axiosWithAuth()
          .post(`/tickets/${ticketID}/resolve`)
          .then(res => {
            console.log('resolveTicket res:', res.data);
            setLoading(false);
            setTicket(res.data.ticket_details);
          })
          .catch(err => {
            console.log("CATCH ERROR: ", err.response.data.message);
            setLoading(false);
            alert(err.response.data.message);
          });
    }
    else {
      alert('You must submit an answer to close the ticket.');
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

                <button className='navLinkInternal button'>Delete</button>
               
                {currentUser.helper && 
                <>
  
                    {ticket.helper_name === null && 
                    <>
                    <button className='button' to='#'>Claim</button>  
                    </>}
             
                    {ticket.status === currentUser.username && 
                    <>
                    <button className='button' to='#'>Unclaim</button>  
                    </>}
                  
                </>
                }
                
                
              </nav>
            </div>



{/* Status div */}
            <div className='statusDiv'>
              
              <div className='statusBox'><h3>Category:</h3> <p>{ticket.category.toUpperCase()}</p></div>
              <div className='statusBox'><h3>Current status:</h3> <p>{ticket.status.toUpperCase()}</p></div>
              {ticket.helper_image && <div className='statusBox'><h3>Expert:</h3><img className="photo" src={ticket.helper_image} alt='Expert image'/></div>}
              {ticket.student_image && <div className='statusBox'><h3>Student:</h3><img className="photo" src={ticket.student_image} alt='Student image'/></div>}
              {!ticket.helper_image && <div className='statusBox'><h3>Expert:</h3><Fa icon={faUserCircle}/></div>}
              {!ticket.student_image && <div className='statusBox'><h3>Student:</h3><Fa icon={faUserCircle}/></div>}
              
             
                
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
              <p> {ticket.helper_name.toUpperCase()} has accepted your question and will be in touch shortly.</p>
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
              <div className='studentDivHeader'>
                <div><p>Student {ticket.student_name} asked:</p></div>
                <div className='secondDiv'><p>{timeago.format(ticket.created_at)}</p></div>
              </div>
              <div><p>Title: {ticket.title}</p></div>
              <p>Description: {ticket.description}</p>
              {openPictures.length > 0 && openPictures.map(image => <Image key={image} src={image}/>)}
              {openVideo && <iframe src={openVideo}/>}
            </div>

            {/* IF PHOTOS/VIDEOS STICK THEM HERE AT BOTTOM OF INSIDE STUDENT DIV
            OR MAKE ANOTHER DIV POP UP IF THE VALUES ARE NOT NULL FOR PHOTO/VIDEO */}

{/* End student question div  */}
{/* Start helper response div  */}

{/* commented this out: {ticket.status !== 'open' && */}

            {ticket.status &&
              <>
              {ticket.solution && 
              <div className='helperDiv'>
              <div>Helper {ticket.helper_name} replied:</div>
              <p>{timeago.format(ticket.resolved_at)}</p>
              <p>{ticket.solution}</p>
              </div>}

{/* Answer box displays only if user is a helper */}

              {currentUser.helper && 
              <div className='answerContainer'>
                  <div className='answerBox'>
                  <h3>Write answer here:</h3>
                  <textarea onChange={handleInput}></textarea>
                  {/* <input type='text' placeholder="" onChange={handleInput} /> */}
                  
                  </div>
                  <button className="button" onClick={resolveTicket}>Submit Answer</button>
              </div>}
              
              </>
            }
            {/* IF PHOTOS/VIDEOS STICK THEM HERE AT BOTTOM OF INSIDE HELPER DIV
            OR MAKE ANOTHER DIV POP UP IF THE VALUES ARE NOT NULL FOR PHOTO/VIDEO */}
            {resolvedPictures.length > 0 && openPictures.map(image => <Image key={image} src={image}/>)}
            {resolvedVideo && <iframe src={resolvedVideo} />}
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