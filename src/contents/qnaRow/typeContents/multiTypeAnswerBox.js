import React from "react";

const MultiTypeAnswerBox = (props) =>{
    let _index = "choices" + props.index;
    return(
        <div className="row">
        <label>
            <input type="radio" value="1" name={_index} 
                id = {props.id + "radio1"}
                onKeyPress = {(e) => {
                    if (e.key === "Enter") {
                        props.onKeyPress();
                    }
                }}
                onClick={(e) => {
                    let answerCheck;
                    if (e.target.value == props.answer) {
                        answerCheck=true;
                    } else {
                        answerCheck=false;
                    }
                props.onClick([answerCheck, props.id, e.target.id]);
            }}/> 
            <span id = "choicesLabel1">{"  " + props.choices[0]}</span>
        </label>
        <label>
            <input type="radio" value="2" name={_index} 
            id = {props.id + "radio2"}
            onKeyPress = {(e) => {
                if (e.key === "Enter") {
                    props.onKeyPress();
                }
            }}
            onClick={(e) => {
                let answerCheck;
                if (e.target.value == props.answer) {
                    answerCheck=true;
                } else {
                    answerCheck=false;
                }
                props.onClick([answerCheck, props.id, e.target.id]);
            }}/> 
            <span id = "choicesLabel2">{"  " + props.choices[1]}</span>
        </label>
        <label>
            <input type="radio" value="3" name={_index} 
            id = {props.id + "radio3"}
            onKeyPress = {(e) => {
                if (e.key === "Enter") {
                    props.onKeyPress();
                }
            }}
            onClick={(e) => {
                let answerCheck;
                if (e.target.value == props.answer) {
                    answerCheck=true;
                } else {
                    answerCheck=false;
                }
                props.onClick([answerCheck, props.id, e.target.id]);
            }}/> 
            <span id = "choicesLabel3">{"  " + props.choices[2]}</span>
        </label>
        <label>
            <input type="radio" value="4" name={_index} 
            id = {props.id + "radio4"}
            onKeyPress = {(e) => {
                if (e.key === "Enter") {
                    props.onKeyPress();
                }
            }}
            onClick={(e) => {
                let answerCheck;
                if (e.target.value == props.answer) {
                    answerCheck=true;
                } else {
                    answerCheck=false;
                }
                props.onClick([answerCheck, props.id, e.target.id]);
            }}/>
            <span id = "choicesLabel4">{"  " + props.choices[3]}</span>
        </label>
        
    </div>
    );
}

export default MultiTypeAnswerBox;