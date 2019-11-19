import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function TicketView() {
  return (
    <div className="headerDiv">
      <div className="initial">
        <Link to="/">
          {" "}
          <h1 className="initial">DevDesk</h1>{" "}
        </Link>
      </div>
      <nav className="loggedIn">
        <NavLink className="navLink" to="/Dashboard/Account">
          Account
        </NavLink>
        <NavLink className="navLink" to="/Dashboard/ReviewTicket"> {/* // Need to make a Component for ReviewTicket */}
          Review Ticket
        </NavLink>
      </nav>
    </div>
  );
}


