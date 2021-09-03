import React from "react";

const MultiTypeAnswerBox = (props) =>{
    
    return(
        <div className="row">
            <select className="" onChange={(e)=>{}}>
                <option value="1">{this.props._choices[0]}</option>
                <option value="2">{this.props._choices[1]}</option>
                <option value="3">{this.props._choices[2]}</option>
                <option value="4">{this.props._choices[3]}</option>
            </select>
        </div>
    );
    
}

export default MultiTypeAnswerBox;