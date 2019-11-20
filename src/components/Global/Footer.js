import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(props) {
    console.log('footer props', props);
    return (
        <footer>
            <p>Copyright 2019 Lambda DevDesk • <Link to="/credits">Credits</Link></p>
        </footer>
    );
}