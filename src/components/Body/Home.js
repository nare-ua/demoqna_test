import Header from './Header'
import Nav from '../Nav/Nav'
import { Link } from 'react-router-dom'

const Home=()=>{
    return(
        <div className="container p-4 text-center">
            <Header title="NLP" />
            <hr style={{border:"5px dashed #282B67",background:"#282B67"}}/>
            <Nav />
            <h1>Home</h1>
            <Link to="http://211.248.186.164:13300/">http://211.248.186.164:13300/</Link>

        </div>
    )
}

export default Home;