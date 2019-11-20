import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Ticket from "./Ticket";
import { axiosWithAuth } from "../../utils/axiosWithAuth";




export default function ViewTicket(props) {
  const [tickets, setTickets] = useState([{}]);

  useEffect(() => {
    const ticketID = props.match.params.id;
    axiosWithAuth()
      .get(`/tickets/${ticketID}`)
      .then(res => {
        console.log(res.data);
        setTickets(res.data);
      });
    // add error catch
  }, []);
  return (
    <div className="ticketContainer">
      <div className="display">
        <h2>tickets #{tickets[0].id}</h2>
        <h2>{tickets[0].category}</h2>
        {/* <nav>
              <NavLink></NavLink>
          </nav> */}
      </div>
      <div className="show-tickets">
        {tickets.map(ticket => {
          return <Ticket ticket={ticket} />;
        })}
      </div>
    </div>
  );
}
