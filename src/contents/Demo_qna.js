import { Component } from "react";
import QnaCreateQ from "./qnaRow/qnaCreateQ";

export default class Demo_qna extends Component{
    
    
    render(){
        let _introQ = "Paste the text of the article or URL you want to make questions. The longer article entered, the more questions you can create.";
        return (
            <div className="container">
                <h1 style={{fontWeight:"bold"}}>Q&A</h1>
                <ul>
                    <li className="h5"><b>Create the questions</b></li>
                </ul>
                <p className="">{_introQ}</p>
                <div className="row">
                    <QnaCreateQ></QnaCreateQ>
                </div>
                {/* qna추가 */}
                
            </div>
        )
    }
}