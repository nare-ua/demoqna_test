import { Component } from "react";
import axios from "axios";
import { Col, Container, Row, Button, InputGroup, FormControl,Spinner } from "react-bootstrap";
import { TextAPI } from "./ApiRow";

export default class CreateDialog extends Component{
    constructor(props) {
        super(props);
        this.state = {
            requestAI : "",
            reqText : "",
            promptQ : "",
            rtnVal : [],
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
        console.log("splitCustomer::", param);
        let test1 = param.split("\n");
        let test3;
        let rtnVals = [];
        console.log("testSplit::", test1[0]);
        rtnVals.inputMyText = test1[0];
        for (let i = 1; i<test1.length; i++) {
            if (test1[i].trim() === "") {
                //    console.log(i + "번 빈값")
            } else {
                let test2 = test1[i].split("\n");
                test3 = test2[0].split(":");
                console.log("test3:key:", test3[0], " val:", test3[1])
                if (test3[0] === "Original") {
                    rtnVals.Original = test3[1]; //본문
                } else if (test3[0] === "Standard American English") {
                    if (!rtnVals.StandardAmericanEnglish) {
                        rtnVals.StandardAmericanEnglish = test3[1]; // 표준 미국 영어
                    }
                } else {
                    if (!rtnVals.Answer) {
                        rtnVals.Answer = test3[0]; // 가이드라인
                        if (rtnVals.Answer === "Standard British English") {
                            if (!rtnVals.StandardBritishEnglish) {
                                rtnVals.StandardBritishEnglish = test3[1];
                            }
                        }
                    }
                }
            }
        }
        console.log("result::", rtnVals)
        return rtnVals;
    }

    onKeyPress = (e) => {
        if (e.key == "Enter") {
            this.requestAPI(this.state.promptQ);
        }
    }

    // 통신 method
    requestAPI = (params) => {
        let _lastStr = params.slice(-1);
        console.log("lastStr::", _lastStr)
        if (_lastStr === ".") {
        } else {
            // params = params + ".";
        }
        console.log("requestAPI params ::", params);
        this.setState({
            btnUI:this.state.loeadingBtn,
        })

        // 주소는 고정
        let url = "http://211.248.186.164:18111/passthru";
        // 셋팅할 데이타 초기값
        let _prompt = "Original:" + params + "\nStandard American English:";
        let _temperature = 0;
        let _max_tokens = 60;
        let _top_p = 1.0;
        let _frequency_penalty = 0.0;
        let _presence_penalty = 0.6;
        let _best_of = 1;
        let _stop = '["\n"]';
        let _engine = "davinci";
        
        axios.post(url, {
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
                "accept": "application/json",
            }
        })
        .then((res) => {
            console.log("res ::", JSON.stringify(res.data.choices[0]));
            let rtnParam = this.splitCustomer(res.data.choices[0].text);//가공
            console.log("returnTest::", rtnParam);

            if (res.data) {
                this.setState({
                    reqText : res.data.choices[0].text,
                    requestAI : <TextAPI text={rtnParam} />,
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
        
    };

    inputStrings = (e) => {
        // console.log("inputStrings ::", e.target.value.trim().length);
        this.setState({
            promptQ : e.target.value,
        })
    }

    render() {
        return(
            <Container className="col-10">
                <Row>
                    <Col>
                        <InputGroup>
                            <InputGroup.Text id="inputQuestions">Q :</InputGroup.Text>
                            <FormControl 
                                onKeyPress = {(e) => this.onKeyPress(e)}
                                onChange = {(e) => this.inputStrings(e)}
                                type="text"
                                placeholder="Please write here~!"
                                aria-label="Please write here~!"
                                aria-describedby="inputQuestions"
                            />
                        </InputGroup>
                        <hr />
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
                        {this.state.requestAI}
                    </Col>
                </Row>
            </Container>
        );
    }
}