import React, { useContext } from 'react'

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';


export default function ClosedTicketList() {
    const { searchTerm, filterByHelper, filterByStudent, filterByOpenClosed } = useContext(CurrentUserContext);


    return (
        <div>
            <h1>This is ClosedTicketList.js</h1>
        </div>
    )
}
