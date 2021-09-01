import { Component } from "react";
import ShortAnswerBox from "./typeContents/basicTypeAnswerContents";
import MultiTypeAnswerBox from "./typeContents/multiTypeAnswerBox";

export default class qnaAddRow extends Component{
    typeContents=()=>{
        let contentSelectType = this.props.questionsParam._question_type;
        if (contentSelectType === "MULTIPLE_CHOICE") {
            return <MultiTypeAnswerBox />;
            // p->in
        } else {
            return <ShortAnswerBox />;
        }
    }

    render(){
        let _typeContents = this.typeContents();
        return(
            <div className="row">
                <div className="row">
                    Q1
                </div>
                <span className="">{this.props._question}</span>
                <div className="row">
                    Answer.
                </div>
                {/* type에 따라 4지선다, 주관식 변경 컴포넌트 */}
                {_typeContents}
            </div>
        );
    }
}