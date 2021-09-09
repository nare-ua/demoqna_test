import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Home from '../Body/Home';
import DemoQna from '../../contents/Demo_qna';

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
            <Nav variant="pills" defaultActiveKey="/"
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
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="EnRec">Entity recognition</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="InCla">Intent classification</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Chat">Chatbot</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Chit">ChitChat</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="AILA">AILA<sub>TM</sub></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="demoQna">Q&A demo</Nav.Link>
                </Nav.Item>
            </Nav>
            {_pages}
        </Container>
        
    )    
}
}
