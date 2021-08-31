import React from 'react';
import {Link} from 'react-router-dom';


const Nav=()=>{

    return(
        <nav className="navbar navbar-expand-sm bg-light mb-5">
            <ul className="navbar-nav">
                <Link className="navbar-brand" to="#">
                    <img src="./logo192.png" style={{width:'30px'}} alt="Logo" />
                </Link>
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Text QA</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Entity recognition</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/">intent classification</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Chatbot</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/">ChitChat</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/">AILA<sub>TM</sub></Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/demoQna">Q&A</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;