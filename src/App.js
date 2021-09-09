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
      </div>
    )
  
}

export default App;