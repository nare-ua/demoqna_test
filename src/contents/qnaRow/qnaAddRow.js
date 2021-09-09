import { Alert, Button, Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import ShortAnswerBox from "./typeContents/basicTypeAnswerContents";
import MultiTypeAnswerBox from "./typeContents/multiTypeAnswerBox";

const QnaAddRow = (props) => {
    let _contentSelectType = props.questions.question_type;
    let _qnaIndex = props.index+1;
    let _typeContents;
    let _hrTag;
    let _answerChk;
    let _hintToggler = "hint"+_qnaIndex;
    let _qnaIdx = "qnaAdd" + _qnaIndex;
    
    if (_qnaIndex == 1) {
        _hrTag = <hr style={{
            color:"white",
            border:"2px dotted grey",
            marginTop:"5px"
        }}/>
    } else {
        _hrTag = "";
    }

    switch(_contentSelectType){
        case "MULTIPLE_CHOICE":
            _typeContents = <MultiTypeAnswerBox id={"Q"+_qnaIndex} choices={props.questions.choices} 
            index={_qnaIndex} answer = {props.questions.answer}
            onKeyPress={(e) => {onKeyHandle(e)}}
            onClick={(e) => {
                _answerChk = props.onClick(e);
            }}/>;
            break;
        case "SHORT_ANSWER":
            _typeContents = <ShortAnswerBox />;
            break;
    }
    
    const [isClick, setIsClick] = useState(false);
    const [correctText, setCorrectText] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const [isLoading, setLoading] = useState(false);
    const [isHide, setIsHide] = useState("hidden");
    const hintsTag = document.getElementById(_hintToggler);

    useEffect(()=>{
        if (isClick) {
        } else {
        }
    }, [isClick, isLoading]);

    const onKeyHandle = (e) => {
        document.getElementById(_qnaIdx).click();
    }
    
    const handleEnterClick = (textValue, textBool, openComp) => {
        // textValue=> correct / incorrect
        // textBool => true / false : 색조정
        // openComp => treu / false : 창이 열려있는지 여부
        //correctText가 false일때만 처음 하단 창이 생성됨 그외-> string값 ->init함수>false
        if (isClick) {
            if (!openComp) {
                return setIsHide(""), setIsClick(false), setCorrectText(textValue), setIsCorrect(textBool), setLoading(false);
            } else {
                return setIsHide(""), setIsClick(true), setCorrectText(textValue), setIsCorrect(textBool), setLoading(false);
            }
        } else {
            return setIsHide("hidden"), setIsClick(true), setCorrectText(textValue), setIsCorrect(textBool), setLoading(false);
        }
        
    }
    const enterClickInit = () => {
        return setIsHide("hidden"), setIsClick(false), setCorrectText(false), setIsCorrect(false);
    }
    useEffect(()=>{
        if (isLoading) {
        } else {
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
            <Card border="primary" as="h1" style={{color:"black", textAlign:"left"}}> 
                <Card.Header style={{fontSize:"1.3em"}}>Q{_qnaIndex + " .  " + props.questions.question}</Card.Header>
                <Card.Body>
                    <Card.Title ></Card.Title>
                    {/* <Card.Subtitle className="m-2 text-muted">Answer :</Card.Subtitle> */}
                    <Card.Text style={{fontSize:"1.5em",fontWeight:"400"}}>
                        {/* type에 따라 4지선다, 주관식 변경 컴포넌트 */}
                        {_typeContents}
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            {/* hint/Enter */}
            <div className="row" style={{display:"flex",alignItems:"right", justifyContent:"right",marginTop:"10px",marginBottom:"35px"}}>
                <Button variant={!isClick ? "outline-primary col-2" : "secondary col-2"} 
                    id={"dropdown-basic"+_qnaIndex} disabled={isClick}
                    onClick={!isLoading ? handleClick : handleClick}
                >
                    {isLoading ? 'Hint▽' : 'Hint△'}
                </Button>
                <Button variant="primary col-2"
                id = {_qnaIdx}
                onClick={(e)=>{
                    if (_answerChk) {
                        if (!correctText) {
                            if (_answerChk[0]) {
                                handleEnterClick("Correct!", true, true);
                            }  else {
                                handleEnterClick("Incorrect...", false, true);
                            }
                        } else {
                            if (_answerChk[0]) {
                                handleEnterClick("Correct!", true, true);
                            }  else {
                                handleEnterClick("Incorrect...", false, true);
                            }
                        }
                    }else{
                        //라디오 check 풀어주기
                        for (let i = 1; i< 5; i++) {
                            let radios = document.getElementById("Q" + _qnaIndex + "radio" + i);
                            radios.checked = false;
                        }
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
