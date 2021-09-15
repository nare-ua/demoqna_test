import zIndex from "@material-ui/core/styles/zIndex";
import CommonAlert from "../components/commonComponentModules/CommonMSG";
import React, { Component } from "react";
import { Col, Container, InputGroup, Row, Button, Spinner, FormControl, FloatingLabel  } from "react-bootstrap";
import axios from "axios";
import style from "../components/Body/css/App.module.css";
import { SummarizeAPIText } from "./ApiRow";

export default class SummarizeFor2ndGrader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            summarizeLengthCheck:"Please write Summarize.",
            summarizeInputColor:"black",
            summarizeResult:"",
            summarizeInputText:"",
            btnUI:<Button className="primary" size="lg"
                onClick = {(e) => this.requestAPI(this.state.summarizeInputText)}
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
        }
    }
    
    requestAPI = (params) => {
        if (this.state.summarizeInputText == "") {
            // alert(this.state.summarizeLengthCheck);
            this.setState({summarizeInputColor:"red"})
            return;
        }
        // console.log("requestAPI Summarize ::", params);
        this.setState({
            btnUI:this.state.loadingBtn, 
        })

        // 값 셋팅
        let _url = "http://211.248.186.164:18111/passthru";
        let _engine = "davinci";
        let _prompt = "My second grader asked me what this passage means:\n\"\"\"\n" + this.state.summarizeInputText + "\n\"\"\"\nI rephrased it for him, in plain language a second grader can understand:\n\"\"\"\n";
        let _temperature = 0.5;
        let _top_p = 1.0;
        let _max_tokens = 100;
        let _frequency_penalty = 0.2;
        let _presence_penalty = 0.0;
        let _best_of = 1;
        let _stop = ["\"\"\""];
        axios.post(_url, {
            params:{
                "engine"              : _engine,
                "prompt"              : _prompt,
                "temperature"         : _temperature,
                "max_tokens"          : _max_tokens,
                "top_p"               : _top_p,
                "frequency_penalty"   : _frequency_penalty,
                "presence_penalty"    : _presence_penalty,
                "best_of"             : _best_of,
                "stop"                : _stop,
            },
        }, {
            headers:{
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        })
        .then((res) => {
            // console.log("APIresult ::", res.data.choices[0].text);
            let rtnText = res.data.choices[0].text;
            let _lastStr = rtnText.slice(-1);
            let _splitStr = "";
            console.log("lastStr::", _lastStr)
            // if (_lastStr === ".") {
                //SummarizeAPIText
                this.setState({
                    summarizeResult:<SummarizeAPIText text={rtnText} />,
                })
            // } else {
            //     _splitStr = rtnText.split(".");
            //     console.log("split::")
                
            // }
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
        if (_inputLen > 0) {
            this.setState({
                summarizeInputText:e.target.value,
                summarizeInputColor:"#00cc00",
                summarizeLengthCheck:""
            })    
        } else {
            this.setState({
                summarizeInputText:e.target.value,
                summarizeInputColor:"red",
                summarizeLengthCheck:"Please write Summarize."
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