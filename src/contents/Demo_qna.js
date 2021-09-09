import { Component } from "react";
import QnaCreateQ from "./qnaRow/qnaCreateQ";

export default class Demo_qna extends Component{
    
    
    render(){
        let _introQ = "Copy and paste the text of the article you want to make questions."; 
        let _introQ2 = "The longer article you enters, the more questions you can create.";
        return (
            <div className="container">
                <h1 style={{fontWeight:"bold"}}>Q&A</h1>
                <ul>
                    <li className="h5"><b>AILA will create the questions using the text you enter.</b></li>
                </ul>
                <p className="">{_introQ}<br/>{_introQ2}</p>
                <div className="row">
                    <QnaCreateQ></QnaCreateQ>
                </div>
                {/* qna추가 */}
                
            </div>
        )
    }
}