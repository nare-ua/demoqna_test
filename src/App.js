import { Component } from "react"
import { Route } from "react-router-dom"
import { Home,Demo_qna } from "./components/Body/index.js"

export default class App extends Component{

  render(){
    return(
      <div className="container">
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/demoQna" component={Demo_qna}></Route>
      </div>
    )
  }
}