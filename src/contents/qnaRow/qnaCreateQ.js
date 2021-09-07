import { Component,useState } from "react";
import InputTypeContents from "./typeContents/inputContentsType";
import InputTypeContents2 from "./typeContents/inputContents2";
import QnaAddRow from "./qnaAddRow";
import axios from "axios";
import { grey } from "@material-ui/core/colors";

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
            answerTypeContents:"",
            questionsParam:[
                {idxQ:0,question_type:"MULTIPLE_CHOICE", text:"",},
            ],
            getQuestion:[
                // {
                //     // idxA:1, 
                //     question_type:"", 
                //     question:"", 
                //     choices:["","","",""], 
                //     answer:"",
                //     short_answer:"",
                // },
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
        // console.log("params-type :", params.question_type);
        let url="http://211.248.186.164:18112/questions";
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
            const qrr = [];
            if (leng > 0) {//받아온 질문이 있는경우
                
                this.setState({
                    getQuestion:res.data.questions,
                })
            } else {
                //받아온 질문이 없는경우
            }
            
            
        })
        .catch((err)=>{
            console.log("error :", err.message);
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
        if (document.getElementById("textArea_byteLimit").value.trim()=="") {
            alert("Please enter your text");
            return;
        } else {
            
            const _arr=[];
            _arr.question_type = this.state.questionRadioValue;
            _arr.text = document.getElementById("textArea_byteLimit").value;
            
            this.requestAPI(_arr);//getQuestion 값 셋팅
        }
    }
    isRight = (rtnValue) => {
        console.log("right:", rtnValue);
        return rtnValue;
    }
    makeQna = (jsonParams) => {
        let arr = [...jsonParams]
        let str = arr.map((questions, i)=>{
            return <QnaAddRow questions={questions} index={i} onClick={(e) => this.isRight(e)}
            makeHints={(_hintFlag)=>this.makeHints(_hintFlag)} hintId={"hintF"+i}
            
            /> 
        })
        return str;
    }

    render(){
        let _content=this.state.typeInput;
        //answerContent에 컴포넌트 생성 및 map()사용
        let _answerContent = this.state.answerTypeContents;
        
        console.log("test", this.state.getQuestion);
        if (this.state.getQuestion.length > 0) {
            _answerContent = this.makeQna(this.state.getQuestion);
        }

        return(
            <div className="container">
                    
                    <div className="row">
                        <label>
                            <input type="radio" name="text"
                            value="inputText" defaultChecked
                            onClick={(e) => this.inputType_onClick(e)}
                            />Input Text
                        </label>
                        <label>
                            <input type="radio" name="text"
                            onClick={(e) => this.inputType_onClick(e)}
                            value="URL" />Input URL
                        </label>
                    </div><br/>

                    {_content}
                    
                    <br/>
                <ul>
                    <li><b>Select an answer type</b></li>
                </ul>
                    <div className="row">
                        <label>
                            <input type="radio" name="question_type"
                            value="MULTIPLE_CHOICE" defaultChecked
                            onClick={(e) => this.questionType_onClick(e)}
                            />Multiple choice anwser
                        </label>
                        <label>
                            <input type="radio" name="question_type"
                            onClick={(e) => this.questionType_onClick(e)}
                            value="SHORT_ANSWER" />Short anwser
                        </label>
                    </div>
                    <div className="row" style={{display:"flex",alignItems:"right", justifyContent:"right"}}>
                        <div className="col-1">
                            <button className="btn btn-primary" 
                            onClick={(e) => this.createQuestion(e)}>Enter</button>
                        </div>
                    </div>
                {_answerContent}
                </div>
        )
    }//render

    
}