import { Component } from "react";
import InputTypeContents from "./typeContents/inputContentsType";
import InputTypeContents2 from "./typeContents/inputContents2";
import QnaAddRow from "./qnaAddRow";
import axios from "axios";
import { Alert, Button,Col,ListGroup,Spinner } from "react-bootstrap";

export default class QnaCreateQ extends Component{
    constructor(props){
        super(props);
        this.state = {
            stateFlag:true,
            textColor:'green',
            nowByte: '0',
            questionTextValue: "",
            questionRadioValue: "MULTIPLE_CHOICE",
            mode: "inputTEXT",
            typeInput:<InputTypeContents />,
            loadingPage:<Alert variant="outline-primary">
                <p>
                    <Spinner animation="grow" variant="primary" />
                    Creating...
                </p>
            </Alert>,
            loadingBtn:<Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>,
            enterBtn:<Button variant="primary" 
            onClick={(e) => this.createQuestion(e)}>Enter</Button>,
            answerTypeContents:"",
            btnCtr:<Button variant="primary" 
            onClick={(e) => this.createQuestion(e)}>Enter</Button>,
            questionsParam:[
                {idxQ:0,question_type:"MULTIPLE_CHOICE", text:"",},
            ],
            getQuestion:[
            ],
            hintsReq:[
                {text:"", questions:[""]}
            ],
            hintsRes:[
                {text:"", hints:[{question:"",highlights:[[0]]}]}
            ],
            // hintText : ["hint▼","hint▲"]
        };
        this.inputType_onClick=this.inputType_onClick.bind(this);
        this.requestAPI = this.requestAPI.bind(this);
        this.setterQuestionText = this.setterQuestionText.bind(this);
        // this.questionType_onClick=this.questionType_onClick.bind(this);
        this.createQuestion=this.createQuestion.bind(this);
        this.makeHints=this.makeHints.bind(this);
    }
    //통신 method
    requestAPI = (params) => {
        console.log("params :", params.text);
        // this.state.btnCtr = this.state.loadingBtn;
        this.setState({
            answerTypeContents:this.state.loadingPage,
            btnCtr:this.state.loadingBtn,
            getQuestion:"",
        })
        // console.log("params-type :", params.question_type);
        let url="http://211.248.186.164:18111/questions";
        axios.post(url, {
            question_type: params.question_type,
            text: params.text
        },
        {
            headers:{
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        })
        .then((res)=>{
            console.log("LEN:", res.data.questions.length);//질문 갯수
            let leng = res.data.questions.length;
            console.log("response:", res);
            console.log("question1:",res.data.questions[0].question);
            // const qrr = [];
            if (leng > 0) {//받아온 질문이 있는경우
                
                this.setState({
                    answerTypeContents:"",
                    getQuestion:res.data.questions,
                })
            } else {
                //받아온 질문이 없는경우
            }
        })
        .catch((err)=>{
            if (err.response) {
                // 백에서 보낸 에러
                console.log("err.response:::", err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else if (err.request) {
                console.log("err.request:::", err.request);
            } else {
                // 기타 에러
                console.log("err.message:::", err.message);
            }
        })
        .finally(()=>{
            this.setState({
                btnCtr:this.state.enterBtn,
            })
        })
    }

    setterQuestionText = (questionTextValue) => {
        this.setState({
            questionTextValue:questionTextValue
        })
    }
    // qna add row event 
    makeHints = (_hintFlag) => {
        console.log("makeHints::", _hintFlag)
        if (_hintFlag) {
            return false;
        } else {
            return true;
        }
        
    }
    
    inputType_onClick = (e) => {
        let inputTypeValue = e.target.value;
        let inputTypeCompo;
        console.log(inputTypeValue);
        if (inputTypeValue == "inputText") {
            inputTypeCompo = <InputTypeContents />
        } else {
            inputTypeCompo = <InputTypeContents2 />
        }
        this.setState({
            typeInput:inputTypeCompo,
        })
    }

  

    questionType_onClick = (e) =>{
        let typeValue = e.target.value;
        console.log("qnaCreateQ :", typeValue);
        
        this.setState({
            questionRadioValue: typeValue,
        })
    }

    //createQuestion EventHandler
    createQuestion = (e) => {
        // console.log("QNACreate:::", document.getElementById("textArea_byteLimit").value)
        let checkValue = document.getElementById("textArea_byteLimit").value;
        if (checkValue.trim()==="") {
            alert("Please enter your text.");
            return;
        } else if (checkValue.length < 10) {
            alert("Please enter at least 10 characters.");
            return;
        } else {
            const _arr=[];
            _arr.question_type = this.state.questionRadioValue;
            _arr.text = checkValue;
            this.requestAPI(_arr);//getQuestion 값 셋팅
        }
    }

    isRight = (rtnValue) => {
        // 정답을 클릭했을 때 값 전달.
        console.log("right:", rtnValue);
        return rtnValue;
    }

    makeQna = (jsonParams) => {
        let _arr = [...jsonParams]
        let str = _arr.map((questions, i)=>{
            return <ListGroup.Item><QnaAddRow questions={questions} index={i} 
            onClick={(e) => this.isRight(e)}
            makeHints={(_hintFlag)=>this.makeHints(_hintFlag)} hintId={"hintF"+i}
            
            /> </ListGroup.Item>
        })
        return <ListGroup variant="flush">{str}</ListGroup>;
    }

    render(){
        let _content=this.state.typeInput;
        //answerContent에 컴포넌트 생성 및 map()사용
        let _answerContent = "";
        _answerContent = this.state.answerTypeContents;
        
        console.log("test", this.state.getQuestion);
        if (this.state.getQuestion.length > 0) {
            _answerContent = this.makeQna(this.state.getQuestion);
        }

        return(
            <div className="container">
                    
                    <div className="row">
                        <label>
                            {/* <input type="radio" name="text"
                                value="inputText" defaultChecked
                                onClick={(e) => this.inputType_onClick(e)}
                            /> */}
                            <span className="m-2"><b>Input Text</b></span>
                        </label>
                        {/* <label>
                            <input type="radio" name="text"
                                onClick={(e) => this.inputType_onClick(e)}
                                value="URL" 
                            /><span className="m-2">Input URL</span>
                        </label> */}
                    </div><br/>

                    {_content}
                    
                    <br/>
                <ul>
                    <li className="h5"><b>Select Answer Type</b></li>
                </ul>
                    <div className="row">
                        <label>
                            <input type="radio" name="question_type"
                                value="MULTIPLE_CHOICE" defaultChecked
                                onClick={(e) => this.questionType_onClick(e)}
                            /><span className="m-2">Multiple choice anwser</span>
                        </label>
                        <label>
                            <input type="radio" name="question_type"
                                onClick={(e) => this.questionType_onClick(e)}
                                value="SHORT_ANSWER" 
                            /><span className="m-2">Short anwser</span>
                        </label>
                    </div>
                    <div className="row" 
                        style={{
                            display:"flex",
                            alignItems:"end", 
                            justifyContent:"end",
                            marginTop:"2em"
                        }}>
                        <div className="col-2">
                            {this.state.btnCtr}
                        </div>
                    </div>
                {_answerContent}
                </div>
        )
    }//render

    
}