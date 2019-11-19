import React from "react";

export default function HelpListItem(props) {
    return (
        <div> 
            <p>{props.title}</p>
            <p>{props.description}</p>
            <p>{props.category}</p>
            <p>{props.time_created}</p>
        </div>
        // <tr>
        //     <td>{props.title}</td>
        //     <td>{props.description}</td>
        //     <td>{props.category}</td>
        //     <td>{props.time_created}</td>
        // </tr>
    )
}