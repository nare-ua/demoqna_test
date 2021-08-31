import { Component } from "react";

export default class ShortAnswerBox extends Component{
    render(){
        return(
            <div className="row">
                <input type="text" name="answer"></input>
            </div>
        );
    }
}