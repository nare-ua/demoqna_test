import React from "react";
import ShortAnswerBox from "./typeContents/basicTypeAnswerContents";
import MultiTypeAnswerBox from "./typeContents/multiTypeAnswerBox";

const QnaAddRow = (props) => {
    console.log("props:", props);
    // state={
    //     qnaAddRowType:this.props.qnaAddRowType,
    //     qnaIndex:this.props.qnaIdx,
    // }
    // typeContents=()=>{
    //     let contentSelectType = this.props.questionsParam._question_type;
    //     if (contentSelectType === "MULTIPLE_CHOICE") {
    //         return <MultiTypeAnswerBox />;
    //         // p->in
    //     } else {
    //         return <ShortAnswerBox />;
    //     }
    // }
    
    
        let _contentSelectType = props.questions.question_type;
        let _qnaIndex = props.index+1;
        let _typeContents;
        console.log("qnaAddRow :", _contentSelectType);
        switch(_contentSelectType){
            case "MULTIPLE_CHOICE":
                console.log("qnaChoices :", props.questions.choices);
                _typeContents = <MultiTypeAnswerBox choices={props.questions.choices} index={_qnaIndex} answer = {props.questions.answer}
                onClick={(e) => props.onClick(e)}/>;
                break;
            case "SHORT_ANSWER":
                _typeContents = <ShortAnswerBox />;
                break;
        }

        return(
            <div className="row">
                <div className="row">
                    Q{_qnaIndex}
                </div>
                <span className="">{props.questions.question}</span>
                <div className="row">
                    Answer.
                </div>
                {/* type에 따라 4지선다, 주관식 변경 컴포넌트 */}
                {_typeContents}
                {/* hint/Enter */}

            </div>
        );
    
}

export default QnaAddRow;