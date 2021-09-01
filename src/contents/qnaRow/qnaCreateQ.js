import { Component } from "react";
import InputTypeContents from "./typeContents/inputContentsType";
import InputTypeContents2 from "./typeContents/inputContents2";
import QnaAddRow from "./qnaAddRow";

export default class QnaCreateQ extends Component{
    constructor(){
        super();
        this.state = {
            mode: "inputTEXT",
            typeInput:<InputTypeContents />,
            answerTypeContents:"",
            questionsParam:[
                {idxQ:0,question_type:"MUTIPLE_CHOICE", text:"",},
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
            ],
            
        };
        this.inputType_onClick=this.inputType_onClick.bind(this);
        this.questionType_onClick=this.questionType_onClick.bind(this);
        this.createQuestion=this.createQuestion.bind(this);
    }
    // qna add row event 
    makeQuestions = () => {
        // let arr = []
        // let str;
        
    }
    handleCICG = (e) => {
        console.log(e.target.value);
        
    }
    
    inputType_onClick = (e) => {
        let inputTypeValue = e.target.value;
        // let inputContents = [...this.state.mode];
        // let inputCheckLimit;
        let inputTypeCompo;
        console.log(inputTypeValue);
        // inputContents:[],
        //     inputCheckLimit:"",
        if (inputTypeValue == "inputText") {
            inputTypeCompo = <InputTypeContents />
        } else {
            //inputTypeValue === "inputURL"
            inputTypeCompo = <InputTypeContents2/>
        }
        this.setState({
            typeInput:inputTypeCompo,
        })

    }
    questionType_onClick = (e) =>{
        // alert(e.target.value);
        const _arr = [];
        let typeValue = e.target.value;
        console.log("qnaCreateQ :", typeValue);
        _arr.question_type = typeValue;
        _arr.idxQ = 0;
        _arr.text = "test";
        // let typeValueContentReturn;
        // if (typeValue == "MUTIPLE_CHOICE") {
            // typeValueContentReturn
            // typeValueContentReturn=<QnaAddRow qnaAddRowType={typeValue} />
        // } else {

        // }
        this.setState({
            questionsParam: _arr,
        })
    }

    //createQuestion EventHandler
    createQuestion = (e) => {
        const _arr=[...this.state.questionsParam];
        let typeValueContentReturn = _arr.map((qnaAddRowType, i)=>{
            
        });

        typeValueContentReturn=<QnaAddRow qnaAddRowType={this.state.questionsParam.question_type} />
        //input
        //fnByteLimitCheck에서  onChange로 state값 셋팅
        // let inTextValue = getTextValue.getAttribute("value");
        // let _question_type = getQuestionType.getAttribute("value");//4지선다/주관식
        // alert("inTextValue :" + inTextValue + "\n_question_type :" + _question_type);
        
        
        //output
        // let arr = [...this.state.questionsParam]
        //idx, input값, output값, q타입, choices구분...
        let _outputValue;//답변값
        let _answer;//답
        let _question;//질문값
        let _choices=[];//4지선다
        // p->in map for addrow
        this.setState({
            answerTypeContents: typeValueContentReturn,
        })
    }
    render(){
        let _content=this.state.typeInput;
        let _answerContent = this.state.answerTypeContents;


        return(
            <div className="container">
                    
                    <div className="row">
                        <label>
                            <input type="radio" name="input_type"
                            value="inputText" defaultChecked
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
                            onClick={(e) => this.createQuestion(e)}>Enter</button>
                        </div>
                    </div>
                {_answerContent}
                </div>
        )
    }//render

    componentDidMount(){
        
    }
}