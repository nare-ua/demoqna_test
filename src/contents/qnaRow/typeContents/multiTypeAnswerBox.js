import React from "react";


const MultiTypeAnswerBox = (props) =>{
    console.log("MultiProps::", props)
    console.log("MultiTypeAnswerBox:props:", props.choices);
    console.log("MTAB PROPS:", props.index);
    console.log("answer:", props.answer);
    let _index = "choices" + props.index;


    return(
        <div className="row">
        <label>
        
            <input type="radio" value="1" name={_index} 
            id = {props.id + "radio1"}
            onClick={(e) => {
                let answerCheck;
                console.log("values", e.target.value);
                if (e.target.value == props.answer) {
                    console.log("정답!")
                    answerCheck=true;
                } else {
                    console.log("오답!!")
                    answerCheck=false;
                }
                props.onClick([answerCheck, props.id, e.target.id]);
            }}/> 
            <span id = "choicesLabel1">{props.choices[0]}</span>
        </label>
        <label>
            <input type="radio" value="2" name={_index} 
            id = {props.id + "radio2"}
            onClick={(e) => {
                let answerCheck;
                console.log("values", e.target.value);
                if (e.target.value == props.answer) {
                    console.log("정답!")
                    answerCheck=true;
                } else {
                    console.log("오답!!")
                    answerCheck=false;
                }
                props.onClick([answerCheck, props.id, e.target.id]);
            }}/> 
            <span id = "choicesLabel2">{props.choices[1]}</span>
        </label>
        <label>
            <input type="radio" value="3" name={_index} 
            id = {props.id + "radio3"}
            onClick={(e) => {
                let answerCheck;
                console.log("values", e.target.value);
                if (e.target.value == props.answer) {
                    console.log("정답!")
                    answerCheck=true;
                } else {
                    console.log("오답!!")
                    answerCheck=false;
                }
                props.onClick([answerCheck, props.id, e.target.id]);
            }}/> 
            <span id = "choicesLabel3">{props.choices[2]}</span>
        </label>
        <label>
            <input type="radio" value="4" name={_index} 
            id = {props.id + "radio4"}
            onClick={(e) => {
                let answerCheck;
                console.log("values", e.target.value);
                if (e.target.value == props.answer) {
                    console.log("정답!")
                    answerCheck=true;
                } else {
                    console.log("오답!!")
                    answerCheck=false;
                }
                props.onClick([answerCheck, props.id, e.target.id]);
            }}/>
            <span id = "choicesLabel4">{props.choices[3]}</span>
        </label>
        
    </div>
    );
    
}

export default MultiTypeAnswerBox;