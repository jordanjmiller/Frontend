import React, { useContext } from 'react'

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';



export default function UserTicketList() {
    const { searchTerm, filterByHelper, filterByStudent, filterByOpenClosed } = useContext(CurrentUserContext);


    return (
        <div>
            <h1>This is UserTicketList.js</h1>
        </div>
    )
}
