import React, { Component } from "react"
import common from "../common/APIConnection"
import NotesToSummaryAPIRow from "./ApiRow/summarizeRow/NotesToSummaryAPIRow";
import { Col, Container, FormControl, InputGroup, Row,Button, Spinner } from "react-bootstrap";

export default class NotesToSummary extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            myInputText : "Tom: Profits up 50%\nJane: New servers are online\nKjel: Need more time to fix software\nJane: Happy to help\nParkman: Beta testing almost done",
            notesToSummaryAPI:"",
            btnUI:  <Button className="primary" size="lg"
                        onClick = {(e) => this.requestAPI(this.state.myInputText)}
                    >Summarize</Button>,
            loadingBtn:<Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />Loading...</Button>,
            defaultBtn:<Button className="primary" size="lg"
                            onClick = {(e) => this.requestAPI(this.state.myInputText)}
                        >Summarize</Button>,
        }
    }

    //json 가공
    splitCustomer = (param) => {
        let test1 = param.split("\n");
        let rtnVals = [];
        
        for (let i = 1; i<test1.length; i++) {
            if (test1[i]) {
                rtnVals += test1[i];
            }
        }
        return rtnVals;
    }

    returnPromptValue = ( temperature, countValue) => {
        //temp가 true면 온도 반환, false면 maxtoken 반환
        let maxTokens = 0;
        if ( !temperature ) {
            if ( countValue > 0 && countValue < 200 ) {
                maxTokens = 64;
            } else if ( countValue >=200 && countValue < 400 ) {
                maxTokens = 120;
            } else {
                maxTokens = 240;
            }
            return maxTokens;
        } else {
            if ( countValue > 0 && countValue < 200 ) {
                maxTokens = 0.9;
            } else if ( countValue >=200 && countValue < 400 ) {
                maxTokens = 0.8;
            } else {
                maxTokens = 0.7;
            }
            return maxTokens;
        }
    }

    requestAPI = (params) => {
        // console.log("params::",params);
        let _countParams = params.length;
        // console.log("Count::",_countParams);
        this.setState({
            btnUI:this.state.loadingBtn
        })
        // 주소는 고정
        let url = "http://211.248.186.164:18111/passthru";
        // 셋팅할 데이타 초기값
        let _temperature = this.returnPromptValue(true, _countParams);
        let _max_tokens = this.returnPromptValue(false, _countParams);
        console.log("tem::", _temperature, "max::", _max_tokens)
        let _top_p = 1.0;
        let _frequency_penalty = 0.2;
        let _presence_penalty = 0.0;
        let _engine = "davinci-instruct-beta";
        let _prompt = "Convert my short hand into a first-hand account of the meeting:\n\n" + params + "\n\nSummarize in " + _max_tokens + " characters or less:";
        
        params = {
            "engine"              : _engine,
            "prompt"              : _prompt,
            "temperature"         : _temperature,
            "max_tokens"          : _max_tokens,
            "top_p"               : _top_p,
            "frequency_penalty"   : _frequency_penalty,
            "presence_penalty"    : _presence_penalty,
        };

        common.requestAPI (params)
        .then((res) => {
            let rtnParam = this.splitCustomer(res.data.choices[0].text);
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
            this.setState({
                btnUI:this.state.defaultBtn,
            })
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
                            <InputGroup.Text>Note</InputGroup.Text>
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
                <Col className="d-grid gap-2">
                        {this.state.notesToSummaryAPI}
                    </Col>
                </Row>
            </Container>
        );
    }
}