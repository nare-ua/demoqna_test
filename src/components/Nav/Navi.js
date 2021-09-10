import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Home from '../Body/Home';
import DemoQna from '../../contents/Demo_qna';
import style from '../Body/css/App.module.css';

export default class Navi extends Component{
    constructor(props){
        super(props);
        this.state = {
            page: <Home />,
        };
    }
render(){
    let _pages = this.state.page;
    return(
        <Container>
            <Container className={style.navis}>
                <Navbar collapseOnSelect expand="lg">
                    <Navbar.Brand href="/" className={style.navTitle}>UNITED ASSOCIATES</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav variant="pills" defaultActiveKey="/" className="mr-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px', marginBottom:"36px"}}
                            onSelect={(selectedKey) =>{
                                if (selectedKey === "/") {
                                    this.setState({
                                        page:<Home />,
                                    })
                                } else if (selectedKey === "demoQna") {
                                    this.setState({
                                        page:<DemoQna />,
                                    })
                                }
                            }}
                        >
                            <Nav.Item>
                                <Nav.Link eventKey="EnRec">Entity Recognition</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="InCla">Intent Cassification</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Chat">Chatbot</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Chit">ChitChat</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="AILA">AILA<sup>TM</sup></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="demoQna">Q&A Demo</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
                {_pages}
        </Container>
        
    )    
}
}
