import React from 'react';
import steve from '../../images/team/steve.jpeg';
import mark from '../../images/team/mark.jpeg';
import jordan from '../../images/team/jordan.png';
import nolan from '../../images/team/nolan.png';
import george from '../../images/team/george.jpeg';
import william from '../../images/team/william.jpeg';

export default function Footer() {
    return (
        <section className="credits">
            <h1>Credits</h1>
            <div className="card-list">
                <div className="card">
                    <img className="card-img" src={steve}
                        alt="Steven Jefferson" />
                    <div className="card-body">
                        <h3>Steven Jefferson</h3>
                        <p>Project Lead</p>
                    </div>
                </div>

                <div className="card">
                    <img className="card-img" src={mark}
                        alt="Mark King" />
                    <div className="card-body">
                        <h3>Mark King</h3>
                        <p>Backend Developer</p>
                        <a className="card-link" target="_blank" rel="noopener noreferrer" href="https://github.com/markpkng">Github</a>
                    </div>
                </div>

                <div className="card">
                    <img className="card-img" src={jordan}
                        alt="Jordan Miller" />
                    <div className="card-body">
                        <h3>Jordan Miller</h3>
                        <p>React Developer<br/>(React II)</p>
                        <a className="card-link" target="_blank" rel="noopener noreferrer" href="https://github.com/jordanjmiller">Github</a>
                    </div>
                </div>

                <div className="card">
                    <img className="card-img" src={nolan}
                        alt="Nolan Picini" />
                    <div className="card-body">
                        <h3>Nolan Picini</h3>
                        <p>UI Developer</p>
                        <a className="card-link" target="_blank" rel="noopener noreferrer" href="https://github.com/NolanPic">Github</a>
                    </div>
                </div>

                <div className="card">
                    <img className="card-img" src={george}
                        alt="George Raymond" />
                    <div className="card-body">
                        <h3>George Raymond</h3>
                        <p>React Developer<br/>(React I)</p>
                        <a className="card-link" target="_blank" rel="noopener noreferrer" href="https://github.com/GeorgeRaymond98">Github</a>
                    </div>
                </div>

                <div className="card">
                    <img className="card-img" src={william}
                        alt="William Sulinski" />
                    <div className="card-body">
                        <h3>William Sulinski</h3>
                        <p>React Developer<br/>(React I)</p>
                        <a className="card-link" target="_blank" rel="noopener noreferrer" href="https://github.com/wsu718">Github</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
