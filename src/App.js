import { Component } from "react"
import Header from './components/Body/Header'
import Navi from './components/Nav/Navi'
import { Route } from "react-router-dom"
import { Home,Demo_qna } from "./components/Body/index.js"

const App = () => {

  
    return(
      <div className="container">
        <Header title="NLP" />
        <Navi />
        {/* <Route exact path="/" component={Home} />
        <Route path="/demoQna" component={Demo_qna} /> */}
      </div>
    )
  
}

export default App;