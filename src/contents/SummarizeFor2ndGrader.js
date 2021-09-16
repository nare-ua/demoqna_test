import React, { Component } from "react";
import { Col, Container, InputGroup, Row, Button, Spinner, FormControl, FloatingLabel, Badge  } from "react-bootstrap";
import style from "../components/Body/css/App.module.css";
import { SummarizeAPIText } from "./ApiRow";
import common from "../common/APIConnection";

export default class SummarizeFor2ndGrader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            btnFlag:false,
            badgeColors:"danger",
            summarizeInputLength:0,
            summarizeLengthCheck:"Please write Summarize.",
            summarizeInputColor:"black",
            summarizeResult:"",
            summarizeInputText:"",
            btnUI:<Button className="primary" size="lg" disabled
            >Enter</Button>,
            loadingBtn:
            <Button variant="primary" disabled>
                <Spinner as="span" animation="grow"
                    size="sm" role="status" aria-hidden="true"
                />Loading...</Button>,
            defaultBtn:
            <Button className="primary" size="lg"
                onClick = {(e) => this.requestAPI(this.state.summarizeInputText)}
            >Enter</Button>,
            disableBtn:<Button className="primary" size="lg" disabled
            >Enter</Button>,
        }
    }
    
    requestAPI = (params) => {
        if (this.state.summarizeInputText === "") {
            this.setState({summarizeInputColor:"red"})
            return;
        }
        if (this.state.summarizeInputLength > 1100) {
            this.setState({summarizeLengthCheck:"too long your text."})
            return;
        }
        this.setState({
            btnUI:this.state.loadingBtn, 
        })

        // 값 셋팅
        let _engine = "davinci";
        let _prompt = "My second grader asked me what this passage means:\n\"\"\"\n" + this.state.summarizeInputText + "\n\"\"\"\nI rephrased this for him, in plain language a second grader can understand:\n\"\"\"\n";
        let _temperature = 0.5;
        let _top_p = 1.0;
        let _max_tokens = 100;
        let _frequency_penalty = 0.2;
        let _presence_penalty = 0.0;
        let _best_of = 1;
        let _stop = ["\"\"\""];
        
        params = {
            "engine"              : _engine,
            "prompt"              : _prompt,
            "temperature"         : _temperature,
            "max_tokens"          : _max_tokens,
            "top_p"               : _top_p,
            "frequency_penalty"   : _frequency_penalty,
            "presence_penalty"    : _presence_penalty,
            "best_of"             : _best_of,
            "stop"                : _stop,
        }

        common.requestAPI(params)
        .then((res) => {
            let rtnText = res.data.choices[0].text;
            this.setState({
                summarizeResult:<SummarizeAPIText text={rtnText} />,
            })
        })
        .catch((err) => {
            if (err.response) {
                // 백에서 보낸 에러
                console.log("err.response:::", err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else if (err.request) {
                console.log("err.request:::", err.request);
            } else {
                // 기타 에러
                console.log("err.message::::", err.message);
            }
        })
        .finally(() => {
            this.setState({
                btnUI:this.state.defaultBtn,
            }) 
        })
    }

    summarizeInputStr = (e) => {
        console.log(e.target.value.length);
        let _inputLen = e.target.value.trim().length;
        let _textLen = e.target.value.length;
        if (_textLen > 0) {
            if (_inputLen > 0) {
                if (_textLen > 1100) {
                    this.setState({
                        summarizeInputText:e.target.value,
                        summarizeInputLength:e.target.value.length,
                        summarizeInputColor:"red",
                        badgeColors:"danger",
                        summarizeLengthCheck:"too long your text.",
                        btnUI:this.state.disableBtn,
                    })
                } else {
                    this.setState({
                        summarizeInputText:e.target.value,
                        summarizeInputLength:e.target.value.length,
                        summarizeInputColor:"#00cc00",
                        summarizeLengthCheck:"",
                        btnUI:this.state.defaultBtn,
                    })    
                }
            } else {
                this.setState({
                    summarizeInputText:e.target.value,
                    summarizeInputLength:e.target.value.length,
                    summarizeInputColor:"red",
                    badgeColors:"danger",
                    summarizeLengthCheck:"Please write Summarize.",
                    btnUI:this.state.disableBtn,
                })
            }
        } else {
            this.setState({
                summarizeInputText:e.target.value,
                summarizeInputLength:e.target.value.length,
                summarizeInputColor:"red",
                badgeColors:"danger",
                summarizeLengthCheck:"Please write Summarize.",
                btnUI:this.state.disableBtn,
            })
            
        }
        
    }    

    render() {

        return(
            <Container className="col-10">
                <Row className={style.qnas} style={{paddingTop:"0px"}}>
                    <Col>
                        <h1 style={{fontWeight:"bold"}}>Summary for Kids (쉬운요약)</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="m-2">
                        <label>
                            <span className="m-2"><b>Input Text</b></span>
                        </label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputGroup className="d-grid gap-2 mb-4">
                            <FloatingLabel id="summarizeInput" label="">
                            <FormControl as="textarea" style={{ height: "200px", borderColor: this.state.summarizeInputColor}}
                                onChange = {(e) => this.summarizeInputStr(e)}
                                type="textarea" placeholder="Please write here~"
                                aria-label="Please write here~"
                                aria-describedby="summarizeInput"
                            />
                        </FloatingLabel>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <span style={{color:this.state.summarizeInputColor}}>{this.state.summarizeInputLength}</span>/1,100 characters
                    </Col>
                    <Col className="justify-content-end">
                        <Badge bg={this.state.badgeColors}>{this.state.summarizeLengthCheck}</Badge>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-grid gap-2">
                        {this.state.btnUI}
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.summarizeResult}
                    </Col>
                </Row>
            </Container>
        )
    }
}