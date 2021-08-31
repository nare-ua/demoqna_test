import { Component } from "react";
import Header from "../components/Body/Header";
import { Nav } from "../components/Nav";
import QnaCreateQ from "./qnaRow/qnaCreateQ";

export default class Demo_qna extends Component{

     

    render(){
        return (
            <div className="container">
                <Header title="QnA"></Header>
                <Nav></Nav>
                <h1>Q&A</h1>
                <ul>
                    <li><b>Create the questions</b></li>
                </ul>
                <a>Paste the text of the article or URL you want to make questions. The longer article entered, the more questions you can create.</a>
                <div className="row">
                    <QnaCreateQ></QnaCreateQ>
                </div>
                {/* qna추가 */}
                
            </div>
        )
    }
}