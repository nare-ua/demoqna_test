import { Alert, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import ShortAnswerBox from "./typeContents/basicTypeAnswerContents";
import MultiTypeAnswerBox from "./typeContents/multiTypeAnswerBox";

const QnaAddRow = (props) => {
    console.log("props:", props);
    let _contentSelectType = props.questions.question_type;
    let _qnaIndex = props.index+1;
    let _typeContents;
    let _hrTag;
    let _hintFlagId = props.hintId;
    let _hintFlag = false;
    let _answerChk;
    let _hintToggler = "hint"+_qnaIndex;
    let _correctTagContents;
    
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
            _typeContents = <MultiTypeAnswerBox id={"Q"+_qnaIndex} choices={props.questions.choices} 
            index={_qnaIndex} answer = {props.questions.answer}
            onClick={(e) => {
                console.log(e)
                _answerChk = props.onClick(e);
            }}/>;
            break;
        case "SHORT_ANSWER":
            _typeContents = <ShortAnswerBox />;
            break;
    }
    // const [hintBtnChange, setHintBtnChange] = useState("outline-primary col-2");
    const [isClick, setIsClick] = useState(false);
    const [correctText, setCorrectText] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const [isLoading, setLoading] = useState(false);
    const [isHide, setIsHide] = useState("hidden");
    const hintsTag = document.getElementById(_hintToggler);
    useEffect(()=>{
        if (isClick) {
            console.log(isHide)
        } else {
            console.log(isHide)
        }
    }, [isClick]);
    
    const handleEnterClick = (textValue, textBool) => {
        if (isClick) {
            return setIsHide(""), setIsClick(false), setCorrectText(textValue), setIsCorrect(textBool);
        } else {
            return setIsHide("hidden"), setIsClick(true), setCorrectText(textValue), setIsCorrect(textBool);
        }
    }
    const enterClickInit = () => {
        return setIsHide("hidden"), setIsClick(false), setCorrectText(false), setIsCorrect(false);
    }
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
            <div className="row" style={{display:"flex",alignItems:"right", justifyContent:"right",marginTop:"10px"}}>
                <Button variant={!isClick ? "outline-primary col-2" : "secondary col-2"} 
                    id={"dropdown-basic"+_qnaIndex} disabled={isClick}
                    onClick={!isLoading ? handleClick : handleClick}
                >
                    {isLoading ? 'hint▽' : 'hint△'}
                </Button>
                <Button variant="primary col-2" onClick={(e)=>{
                    if (_answerChk) {
                        console.log("ok1")
                        if (!isClick) {
                            // console.log("test:::", _answerChk[0], " / ", _answerChk[1])
                            if (_answerChk[0]) {
                                // alert("정답입니다.");
                                handleEnterClick("correct!", true);
                            }  else {
                                // alert("다시 생각해보세요");
                                handleEnterClick("incorrect...", false);
                            }
                        } else {
                            console.log("no1")
                            enterClickInit();    
                        }
                    }else{
                        console.log("no2")
                        enterClickInit();
                    }
                }}>Enter</Button>
            </div>
            <Alert variant={!isCorrect ? "danger" : "success"} style={{marginTop:"10px"}}
            hidden={!isClick ? "hidden" : ""}>
                <Alert.Heading>{correctText}</Alert.Heading>
                <hr />
                <p>{props.questions.hints}</p>
            </Alert>
            <Alert variant="secondary" style={{marginTop:"10px"}} hidden={!isLoading ? "hidden" : ""}>
                <Alert.Heading>Hint!</Alert.Heading>
                <p>{props.questions.hints}</p>
            </Alert>
        </div>
    );
    
}

export default QnaAddRow;