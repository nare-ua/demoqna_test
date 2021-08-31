import { Component } from "react";

export default class QnaCreateQ extends Component{
    constructor(){
        super();
        this.state = {
            mode: "TEXT",
            nowByte: '0',
            textColor:'green',
            questionsParam:[
                {idxQ:1,question_type:"", text:"",}
            ],
            getQuestion:[
                {
                    idxA:1, 
                    question_type:"", 
                    question:"", 
                    choices:["","","",""], 
                    answer:0,
                    short_answer:"",
                },
            ],
            
            hintsReq:[
                {text:"", questions:[""]}
            ],
            hintsRes:[
                {text:"", hints:[{question:"",highlights:[[0]]}]}
            ]
        };
        this.fnByteLimitCheck = this.fnByteLimitCheck.bind(this);
        
    }
    // qna add row event 
    makeQuestions = () => {
        let arr = []
        let str;
        
    }
    handleCICG = (e) => {
        console.log(e.target.value);
        
    }
    

    fnByteLimitCheck=(e)=>{
        // alert(e.target.value)
        const maxByte = 10000;//maxBytes
        const textVal = e.target.value;//입력한 값
        const textLen = textVal.length;//입력한 글자수
        let changeColor = "green";
        let totalByte = 0;
        for(let i = 0; i<textLen; i++) {
            const eachChar = textVal.charAt(i);
            const uniChar = escape(eachChar);
            if(uniChar.length > 4) {
                totalByte +=2;//한글
            } else {
                totalByte += 1;//영어
            }
        }
        const getNowByte = document.getElementById("nowByte");
        const getStyle = getNowByte.getAttribute("style");
        if (totalByte > maxByte) {
            getNowByte.innerText = totalByte;
            changeColor = "red";
        } else {
            getNowByte.innerText = totalByte;
            changeColor = "#00cc00";
        }
        this.setState({
            nowByte:e.target.value,
            textColor:changeColor
        });
        

    }   
    inputType_onClick = (e) => {
        this.state.mode = e.target.value;
        let inputTypeBox;

    }
    questionType_onClick = (e) =>{
        // alert(e.target.value);
        const _typeValue = e.target.value;

    }

    //createQuestion EventHandler
    createQuestion = (e) => {
        //input
        //fnByteLimitCheck에서  onChange로 state값 셋팅
        // let inTextValue = getTextValue.getAttribute("value");
        // let _question_type = getQuestionType.getAttribute("value");//4지선다/주관식
        // alert("inTextValue :" + inTextValue + "\n_question_type :" + _question_type);
        
        
        //output
        let arr = [...this.state.questionsParam]
        //idx, input값, output값, q타입, choices구분...
        let _outputValue;//답변값
        let _answer;//답
        let _question;//질문값
        let _choices=[];//4지선다
        // p->in map for addrow
    }
    render(){
        let _mode = this.state.mode;
        let _content=null;
        let _checkLimit=null;
        let _selectedType=this.state.selectedType;


        
        switch(_mode){
            case "inputText":
                _content = <textarea rows="8" className="form-control"
                id="textArea_byteLimit" 
                name="textArea_byteLimit" 
                onChange={this.fnByteLimitCheck}></textarea>;
                _checkLimit=<div className="row">
                    <br/>
                    <sup><span id="nowByte" onChange={this.fnByteLimitCheck} 
                    style={{color:this.state.textColor}}>0</span>|10,000 bytes</sup>
                </div>
                break;
            case "inputURL":
                _content = <input className="form-control"
                id="input"></input>
                break;
        }
        return(
            <div className="container">
                    
                    <div className="row">
                        <label>
                            <input type="radio" name="input_type"
                            value="TEXT" defaultChecked
                            onClick={(e) => this.inputType_onClick(e)}
                            />Input Text
                        </label>
                        <label>
                            <input type="radio" name="input_type"
                            onClick={(e) => this.inputType_onClick(e)}
                            value="URL" />Input URL
                        </label>
                    </div><br/>

                    {_content}
                    {_checkLimit}
                    <br/>
                <ul>
                    <li><b>Select an answer type</b></li>
                </ul>
                    <div className="row">
                        <label>
                            <input type="radio" name="question_type"
                            value="MUTIPLE_CHOICE" defaultChecked
                            onClick={(e) => this.questionType_onClick(e)}
                            />Multiple choice anwser
                        </label>
                        <label>
                            <input type="radio" name="question_type"
                            onClick={(e) => this.questionType_onClick(e)}
                            value="SHORT_ANSWER" />Short anwser
                        </label>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <button className="btn btn-primary" 
                            onChange={(e) => this.createQuestion(e)}>Enter</button>
                        </div>
                    </div>
                </div>
                
        )
    }
}