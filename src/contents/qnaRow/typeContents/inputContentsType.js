import { Component } from "react";

export default class InputTypeContents extends Component{
    constructor(){
        super();
        this.state={
            textColor:'green',
            nowByte: '0',
        }
    }
    fnByteLimitCheck=(e)=>{
        // alert(e.target.value)
        const maxByte = 10000;//maxBytes
        const textVal = e.target.value;//입력한 값
        const textLen = textVal.length;//입력한 글자수
        let changeColor = "green";
        let totalByte = 0;
        for(let i = 0; i<textLen; i++) {
            const eachChar = textVal.charAt(i);
            const uniChar = escape(eachChar);
            if(uniChar.length > 4) {
                totalByte +=2;//한글
            } else {
                totalByte += 1;//영어
            }
        }
        const getNowByte = document.getElementById("nowByte");
        const getStyle = getNowByte.getAttribute("style");
        if (totalByte > maxByte) {
            getNowByte.innerText = totalByte;
            changeColor = "red";
        } else {
            getNowByte.innerText = totalByte;
            changeColor = "#00cc00";
        }
        this.setState({
            nowByte:e.target.value,
            textColor:changeColor
        });
        

    } 
    render(){
        return(
            <div className="row">
            <textarea rows="8" className="form-control"
                id="textArea_byteLimit" 
                name="textArea_byteLimit" 
                onChange={(e)=>this.fnByteLimitCheck(e)} 
                
                ></textarea>
                <div className="row">
                    <br/>
                    <sup><span id="nowByte" onChange={(e)=>this.fnByteLimitCheck(e)} 
                    style={{color:this.state.textColor}}>0</span>|10,000 bytes</sup>
                </div>
            </div>
        );
    }
}