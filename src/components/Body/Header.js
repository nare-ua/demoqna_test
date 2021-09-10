import { Col, Row } from "react-bootstrap";
import style from "./css/App.module.css";
const Header=({title})=>{
    return(
        <header className={style.header}>
        <p className={style.title}>
            <Row>
                <Col xs lg="auto">
                    <span style={{color:'#282B67'}}>UNITED ASSOCIATES</span>
                </Col>
                <Col>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{color:'#FF2F92'}}>*</span>
                    <span style={{color:'#0096FF'}}>{title} DEMO</span>
                </Col>
            </Row>
            <hr style={{border:'black solid 5px'}}/>
        </p>
        </header>
    )
}
export default Header;