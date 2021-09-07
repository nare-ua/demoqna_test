import {Dropdown, Button} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import ShortAnswerBox from "./typeContents/basicTypeAnswerContents";
import MultiTypeAnswerBox from "./typeContents/multiTypeAnswerBox";
import { set } from "react-hook-form";

const QnaAddRow = (props) => {
    console.log("props:", props);
    let _contentSelectType = props.questions.question_type;
    let _qnaIndex = props.index+1;
    let _typeContents;
    let _hrTag;
    let _hintFlagId = props.hintId;
    let _hintText = "hint▽";
    let _hintFlag = false;
    let _answerChk;
    let _hintToggler = "hint"+_qnaIndex;
    
        
        //{_hintFlag ? "hint▼" : "hint▲" }
        if (_qnaIndex == 1) {
            _hrTag = <hr style={{
                color:"white",
                border:"1px dotted grey"
            }}/>
        } else {
            _hrTag = "";
        }
        console.log("qnaAddRow :", _contentSelectType);
        switch(_contentSelectType){
            case "MULTIPLE_CHOICE":
                console.log("qnaChoices :", props.questions.choices);
                _typeContents = <MultiTypeAnswerBox id={"Q"+_qnaIndex} choices={props.questions.choices} index={_qnaIndex} answer = {props.questions.answer}
                onClick={(e) => {
                    console.log(e)
                    _answerChk = props.onClick(e)}}/>;
                break;
            case "SHORT_ANSWER":
                _typeContents = <ShortAnswerBox />;
                break;
        }

        const [isLoading, setLoading] = useState(false);
        const [isHide, setIsHide] = useState("hidden");
        const hintsTag = document.getElementById(_hintToggler);
        useEffect(()=>{
            if (isLoading) {
                console.log(isHide)
            } else {
                console.log(isHide)
            }
        }, [isLoading]);
        const handleClick = () => {
            if (isLoading) {
                return setLoading(false), setIsHide("");
            } else {
                return setLoading(true), setIsHide("hidden");
            }
        };

        return(
            <div className="row" style={{marginTop:"10px"}}>
                {_hrTag}
                <div className="row" style={{marginTop:"20px"}}>
                    Q{_qnaIndex}
                </div>
                <span className="">{props.questions.question}</span>
                <div className="row">
                    Answer.
                </div>
                {/* type에 따라 4지선다, 주관식 변경 컴포넌트 */}
                {_typeContents}
                {/* hint/Enter */}
                <div className="row" style={{display:"flex",alignItems:"right", justifyContent:"right"}}>
                    <Button variant="outline-primary col-2" 
                        id={"dropdown-basic"+_qnaIndex}
                        onClick={!isLoading ? handleClick : handleClick}
                    >
                        {isLoading ? 'hint▽' : 'hint△'}
                    </Button>
                    <Button variant="primary col-2" onClick={(e)=>{
                        //정답 확인 버튼
                        console.log("확인:::", _answerChk[0])
                        
                        const hintBtn = document.getElementById("dropdown-basic"+_qnaIndex);
                        if (_answerChk[0]) {
                            // alert("정답입니다.");
                            // hintBtn
                        }  else {
                            // alert("다시 생각해보세요");
                        }
                    }}>Enter</Button>
                </div>
                <div className="row" style={{marginTop:"10px"}} hidden={!isLoading ? "hidden" : ""}>
                    <input type="text" value={props.questions.hints}/>
                </div>
            </div>
        );
    
}

export default QnaAddRow;