import Header from './Header'
import Nav from '../Nav/Nav'

const Home=()=>{
    return(
        <div className="container p-4 text-center">
            <Header title="nlp" />
            <Nav />
            <h1>Home</h1>

        </div>
    )
}

export default Home;