import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
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
        <Container className={style.navis}>
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
            {_pages}
        </Container>
        
    )    
}
}
