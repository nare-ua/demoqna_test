import { Link } from 'react-router-dom'

const Home=(props)=>{
    return(
        <div className="container p-4 text-center">
            <Link onClick={() => {
                let linkUrl = props.go;
                window.open(linkUrl, "_blank");
            }}><h1>Home</h1></Link>
        </div>
    )
}

export default Home;