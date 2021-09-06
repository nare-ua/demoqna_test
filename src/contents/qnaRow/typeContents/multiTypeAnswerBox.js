import React from "react";


const MultiTypeAnswerBox = (props) =>{
    console.log("MultiTypeAnswerBox:props:", props.choices);
    console.log("MTAB PROPS:", props.index);
    console.log("answer:", props.answer);
    let _index = "choices" + props.index;


    return(
        <div className="row">
        <label>
        
            <input type="radio" value="1" name={_index} 
            onClick={(e) => {
                if (e.target.value === props.answer) {
                    // document.getElementById("choicesLabel1").style.color("red");
                }
                props.onClick(e);
            }}/> 
            <span id = "choicesLabel1">{props.choices[0]}</span>
        </label>
        <label>
            <input type="radio" value="2" name={_index} 
            onClick={(e) => {
                if (e.target.value === props.answer) {
                    document.getElementById("choicesLabel2").setAttribute("style", {color:"green"})
                }
                props.onClick(e);
            }}/> 
            <span id = "choicesLabel2">{props.choices[1]}</span>
        </label>
        <label>
            <input type="radio" value="3" name={_index} 
            onClick={(e) => {
                if (e.target.value === props.answer) {
                    document.getElementById("choicesLabel3").setAttribute("style", {color:"green"})
                }
                props.onClick(e);
            }}/> 
            <span id = "choicesLabel3">{props.choices[2]}</span>
        </label>
        <label>
            <input type="radio" value="4" name={_index} 
            onClick={(e) => {
                if (e.target.value === props.answer) {
                    document.getElementById("choicesLabel4").setAttribute("style", {color:"green"})
                }
                props.onClick(e);
            }}/>
            <span id = "choicesLabel4">{props.choices[3]}</span>
        </label>
        
    </div>
    );
    
}

export default MultiTypeAnswerBox;