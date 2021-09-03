import React from "react";
import ShortAnswerBox from "./typeContents/basicTypeAnswerContents";
import MultiTypeAnswerBox from "./typeContents/multiTypeAnswerBox";

const QnaAddRow = (props) => {
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
    
    
        let _contentSelectType = this.state.qnaAddRowType;
        let _typeContents;
        console.log("qnaAddRow :", _contentSelectType);
        switch(_contentSelectType){
            case "MULTIPLE_CHOICE":
                _typeContents = <MultiTypeAnswerBox />;
                break;
            case "SHORT_ANSWER":
                _typeContents = <ShortAnswerBox />;
                break;
        }

        return(
            <div className="row">
                <div className="row">
                    Q{this.qnaIndex}
                </div>
                <span className="">{_contentSelectType}</span>
                <div className="row">
                    Answer.
                </div>
                {/* type에 따라 4지선다, 주관식 변경 컴포넌트 */}
                {_typeContents}

            </div>
        );
    
}

export default QnaAddRow;