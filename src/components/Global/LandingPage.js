import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import process1 from '../../images/process1.jpg';
import process2 from '../../images/process2.jpg';
import process3 from '../../images/process3.jpg';

export default function LandingPage() {
    return (
        <div className="container">
        <section className="main-hero">
            <div className="cta">
                <h1>Get support, fast.</h1>
                <p>Problem? We're here to help. Get a ticket in and our team of helpers will get you back on track.</p>
                <Link className="button" to='/Dashboard'>Submit a Ticket</Link>
            </div>
        </section>

        <section className="process">
            <h2>A simple process.</h2>

            <div className="card-list">
                
                <div className="card">
                    <img className="card-img" src={process1} alt="Frustrated individual" />
                    <div className="card-body">
                        <h3>Ask your question</h3>
                        <p>Skip the frustration, get to the answer.</p>
                        <Link to='/Login'>Get Started</Link>
                    </div>
                </div>

                
                <div className="card">
                    <img className="card-img" src={process2} alt="Man contemplates code" />
                    <div className="card-body">
                        <h3>Get help</h3>
                        <p>Our team of helpers will get you back on track.</p>
                        <Link to='/Login'>Get Started</Link>
                    </div>
                </div>

                
                <div className="card">
                    <img className="card-img" src={process3} alt="Programmer at work" />
                    <div className="card-body">
                        <h3>Get to work</h3>
                        <p>Get back to getting stuff done.</p>
                        <Link to='/Login'>Get Started</Link>
                    </div>
                </div>
            </div>
        </section>
        </div>
           
    )
}
