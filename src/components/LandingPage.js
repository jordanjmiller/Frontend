import React from 'react'
import { Link, NavLink } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div>
            <h2>Welcome to DevDesk!</h2>
            <Link to='/Login'>Click here to login.</Link>
        </div>
    )
}
