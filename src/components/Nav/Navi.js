import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { ButtonGroup, Container, DropdownButton, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Home from '../Body/Home';
import DemoQna from '../../contents/Demo_qna';
import CreateDialog from '../../contents/CreateDialog';
import SummarizeFor2ndGrader from '../../contents/SummarizeFor2ndGrader';
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
                                } else if (selectedKey === "Grammar Correction") {
                                    this.setState({
                                        brandtitle:selectedKey,
                                        page:<CreateDialog />,
                                    })
                                } else if (selectedKey === "Summary for Kids") {
                                    this.setState({
                                        brandtitle:selectedKey,
                                        page:<SummarizeFor2ndGrader />,
                                    })
                                }
                            }}
                        >
                            <Nav.Item>
                                <Nav.Link eventKey="AILA">AILA<sup>TM</sup></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="LBQ-질문학습">LBQ-질문학습</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Grammar Correction">Grammar Correction</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Summary for Kids">Summary for Kids</Nav.Link>
                            </Nav.Item>
                            <NavDropdown title="Menu" id="nav-dropdown">
                                <NavDropdown.Item eventKey="AILA">AILA<sup>TM</sup></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="Text QA">Text QA</NavDropdown.Item>
                                <NavDropdown.Item eventKey="Entity Recognition">Entity Recognition</NavDropdown.Item>
                                <NavDropdown.Item eventKey="Intent Cassification">Intent Cassification</NavDropdown.Item>
                                <NavDropdown.Item eventKey="Chatbot">Chatbot</NavDropdown.Item>
                                <NavDropdown.Item eventKey="Chit">ChitChat</NavDropdown.Item>
                            </NavDropdown>
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
