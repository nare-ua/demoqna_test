import axios from "axios";
import React, { Component } from "react"
import NotesToSummaryAPIRow from "./ApiRow/summarizeRow/NotesToSummaryAPIRow";
import { Col, Container, FormControl, InputGroup, Row,Button, Spinner } from "react-bootstrap";

export default class NotesToSummary extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            myInputText : "Tom: Profits up 50%\nJane: New servers are online\nKjel: Need more time to fix software\nJane: Happy to help\nParkman: Beta testing almost done",
            notesToSummaryAPI:"",
            btnUI:  <Button className="primary" size="lg"
                        onClick = {(e) => this.requestAPI(this.state.promptQ)}
                    >CreateDialog</Button>,
            loeadingBtn:<Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />Loading...</Button>,
            defaultBtn:<Button className="primary" size="lg"
                            onClick = {(e) => this.requestAPI(this.state.promptQ)}
                        >CreateDialog</Button>,
        }
    }

    //json 가공
    splitCustomer = (param) => {
        // console.log("splitCustomer::", param);
        let test1 = param.split("\n");
        let test3;
        let rtnVals = [];
        // console.log("testSplit::", test1);
        
        for (let i = 1; i<test1.length; i++) {
            if (test1[i]) {
                // console.log("test1[" + i + "] ::" +test1[i]);
                rtnVals += test1[i];
            }
        }
        // console.log("result::", rtnVals)
        return rtnVals;
    }

    requestAPI = (params) => {
        console.log("params::",params);

        // 주소는 고정
        let url = "http://211.248.186.164:18111/passthru";
        // 셋팅할 데이타 초기값
        let _prompt = "Convert my short hand into a first-hand account of the meeting:\n\n" + this.state.myInputText + "\n\nOne-sentence summary:";
        let _temperature = 0.9;
        let _max_tokens = 64;
        let _top_p = 1.0;
        let _frequency_penalty = 0.2;
        let _presence_penalty = 0.0;
        let _best_of = 1;
        let _stop = ["\n\n"];
        let _engine = "davinci-instruct-beta";

        axios.post(url, {
            params:{
                "engine"              : _engine,
                "prompt"              : _prompt,
                "temperature"         : _temperature,
                "max_tokens"          : _max_tokens,
                "top_p"               : _top_p,
                "frequency_penalty"   : _frequency_penalty,
                "presence_penalty"    : _presence_penalty,
                // "best_of"             : _best_of,
                // "stop"                : _stop,
            },
        }, {
            headers:{
                "Content-Type": "application/json",
                "accept": "application/json",
            }
        })
        .then((res) => {
            // console.log("res ::", JSON.stringify(res.data.choices[0].text))
            // let _resText = res.data.choices[0].text;
            
            let rtnParam = this.splitCustomer(res.data.choices[0].text);
            // console.log("returnTest::", rtnParam);
            if (res.data) {
                this.setState({
                    notesToSummaryAPI: <NotesToSummaryAPIRow text={rtnParam} />,
                })
            }
        })
        .catch((err) => {
            if (err.response) {
                console.log("error response::", err.response.data);
            } else if (err.request) {
                console.log("error request::", err.request);
            } else {
                console.log("error ::", err.message);
            }
        })
        .finally(() => {

        })
    }

    summaryInput = (e) => {
        this.setState({
            myInputText:e.target.value,
        })
    }

    render() {
        return(
            <Container className="col-10">
                <Row>
                    <Col>
                        <InputGroup>
                            <InputGroup.Text>Note to Summary</InputGroup.Text>
                            <FormControl 
                                as="textarea" style={{ height: "200px",}} 
                                defaultValue={this.state.myInputText} 
                                onChange = {(e) => this.summaryInput(e)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col className="d-grid gap-2">
                        {this.state.btnUI}
                    </Col>
                </Row>
                <hr />  
                <Row>
                    <Col>
                        {this.state.notesToSummaryAPI}
                    </Col>
                </Row>
            </Container>
        );
    }
}