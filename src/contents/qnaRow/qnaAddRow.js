import { Component } from "react";
import { Link } from "react-router-dom";
import { ShortAnswerBox, MultiTypeAnswerBox } from ".";

export default class qnaAddRow extends Component{
    typeContents=()=>{
        let contentSelectType = this.props.questionsParam._question_type;
        if (contentSelectType == "MULTIPLE_CHOICE") {
            return <MultiTypeAnswerBox />
        } else {
            return <ShortAnswerBox />
        }
    }

    render(){
        let _selecttypeContents=null;
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