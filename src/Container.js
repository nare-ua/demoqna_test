import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import App from './App'

const Container=()=>{
    return(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
}
export default Container;