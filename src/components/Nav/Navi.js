import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Home from '../Body/Home';
import DemoQna from '../../contents/Demo_qna';
import style from '../Body/css/App.module.css';
import { Helmet } from 'react-helmet';

export default class Navi extends Component{
    constructor(props){
        super(props);
        this.state = {
            page: <DemoQna />,
            brandtitle: "LBQ-질문학습",
        };
    }
render(){
    let _pages = this.state.page;
    let _breandTitle = this.state.brandtitle;
    return(
        <Container>
            <Helmet>
                <title>{this.state.brandtitle}</title>
            </Helmet>
            <Container className={style.navis}>
                <Navbar collapseOnSelect expand="xl">
                    <Navbar.Brand href="/demoQna" className={style.navTitle}>{_breandTitle}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav variant="pills" defaultActiveKey="demoQna" className="me-auto my-2 my-lg-0"
                            style={{ marginBottom:"36px"}}
                            onSelect={(selectedKey) =>{
                                if (selectedKey === "Text QA") {
                                    this.setState({
                                        brandtitle:selectedKey,
                                        page:<Home go="http://211.248.186.164:13300/#/en/textqa"/>,
                                    })
                                } else if (selectedKey === "LBQ-질문학습") {
                                    this.setState({
                                        brandtitle:selectedKey,
                                        page:<DemoQna />,
                                    })
                                } else if (selectedKey === "Entity Recognition") {
                                    this.setState({
                                        brandtitle:selectedKey,
                                        page:<Home go="http://211.248.186.164:13300/#/en/ner"/>,
                                    })
                                } else if (selectedKey === "Intent Cassification") {
                                    this.setState({
                                        brandtitle:selectedKey,
                                        page:<Home go="http://211.248.186.164:13300/#/en/intent"/>,
                                    })
                                } else if (selectedKey === "Chatbot") {
                                    this.setState({
                                        brandtitle:selectedKey,
                                        page:<Home go="http://211.248.186.164:13300/#/en/chat"/>,
                                    })
                                } else if (selectedKey === "Chit") {
                                    this.setState({
                                        brandtitle:selectedKey,
                                        page:<Home go="http://211.248.186.164:13300/#/en/chitchat"/>,
                                    })
                                } else if (selectedKey === "AILA") {
                                    this.setState({
                                        brandtitle:selectedKey,
                                        page:<Home go="http://211.248.186.164:13300/#/en/doridori"/>,
                                    })
                                }
                            }}
                        >
                            <Nav.Item>
                                <Nav.Link eventKey="Text QA">Text QA</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Entity Recognition">Entity Recognition</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Intent Cassification">Intent Cassification</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Chatbot">Chatbot</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Chit">ChitChat</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="AILA">AILA<sup>TM</sup></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="LBQ-질문학습">LBQ-질문학습</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            <span className="col-10"><hr style={{border:'black solid 2px'}}/></span>
            </Container>
            <Container>
                {_pages}
            </Container>
        </Container>
        
    )    
}
}
