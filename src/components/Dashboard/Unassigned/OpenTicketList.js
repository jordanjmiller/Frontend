<<<<<<< HEAD
import React, { useEffect, useState, useContext } from "react";
import { axiosWithAuth } from "../../../utils/axiosWithAuth";
import OpenTicket from "./OpenTicket";
import "../Dashboard.css";
=======
import React, {useEffect, useState, useContext} from 'react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import OpenTicket from './OpenTicket';
>>>>>>> a9b033f633320c78cd85173893cf3745dc40a3b9

import { CurrentUserContext } from "../../../contexts/CurrentUserContext.js";

export default function OpenTicketList() {
  const {
    searchTerm,
    filterByHelper,
    filterByStudent,
    filterByOpenClosed
  } = useContext(CurrentUserContext);

  const [helpRequests, setHelpRequests] = useState([]);

<<<<<<< HEAD
  useEffect(() => {
    axiosWithAuth()
      .get("/tickets/open")
      .then(res => {
        // console.log(res.data)
        setHelpRequests(res.data);
      });
    // add error catch
  }, []);

  // console.log(helpRequests);
  return (
    <div className="helperDashboard">
      {" "}
      {/* some styling is set in app.js to render dashboard correctly */}
      <h1>This is OpenTicketList.js</h1>
      <table className="tickettable">
        <thead>
          <tr>
            <th>Name</th>
            {/* <th>Status</th> */}
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
                <OpenTicket
                  key={request.id}
                  id={request.id}
                  name={request.name}
                  category={request.category}
                  title={request.title}
                  description={request.description}
                  created_at={request.created_at}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
=======
    useEffect(() => {
        axiosWithAuth().get('/tickets/open')
        
        .then(res => {
            // console.log(res.data)
            setHelpRequests(res.data)
        })
        .catch(err => {console.log('CATCH ERROR: ', err.response.data.message)
        alert(err.response.data.message)});
    }, []);

    // console.log(helpRequests);
    return (
         <div className='helperDashboard'> {/* some styling is set in app.js to render dashboard correctly */}
         <h2>Unassigned tickets</h2>
            <table className='tickettable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Subject</th>
                        <th>Age</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {helpRequests.map(request => {
                        return (
                            <tr key={request.id}>
                            <OpenTicket 
                            // key={request.id}
                            id={request.id}
                            student_name={request.student_name}
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
>>>>>>> a9b033f633320c78cd85173893cf3745dc40a3b9
}
